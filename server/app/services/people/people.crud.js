const people = require("../../model/people/people.model.js");
const facility = require("../../model/facility/facility.model.js");
const { sendMail } = require("../../utilities/sendMail.js");
module.exports = {
  addPeople,
  getByRole,
  getByCategoryRef,
  getById,
  bookAppointmentForPerson,
};

// Add new person (Doctor, Nurse, Driver, etc.)
async function addPeople(personDetails) {
  try {
    const newPerson = new people(personDetails);
    await newPerson.save();
    return newPerson;
  } catch (error) {
    throw error;
  }
}

// Get people by role (Doctor, Nurse, Driver, etc.)
async function getByRole(req) {
  try {
    const { role } = req.query;
    const peopleDetails = await people.find({
      role,
    });
    return { peopleDetails };
  } catch (error) {
    throw error;
  }
}

async function getByCategoryRef(req) {
  try {
    const { categoryRef } = req.query;
    const personDetails = await people.find({
      categoryRef,
    });
    return { personDetails };
  } catch (error) {
    throw error;
  }
}

// Get person by ID
async function getById(req) {
  try {
    const { personId } = req.query;
    const personDetails = await people.findOne({
      _id: personId,
    });
    return { personDetails };
  } catch (error) {
    throw error;
  }
}

// Book an appointment for a specific person (Doctor, Nurse, etc.)
async function bookAppointmentForPerson(params) {
  try {
    const { personId, appointmentDate, appointmentTime, userDetails } = params;

    // Fetch person details
    const personDetails = await people.findById(personId);

    if (!personDetails) {
      throw new Error("Person not found");
    }

    sendMail(
      userDetails.email,
      "Appointment request confirmation",
      `<p>Hi ${userDetails.userName},</p>
      <p>Your appointment request with ${personDetails.name} (${personDetails.role}) on ${appointmentDate} at ${appointmentTime} has been registered.</p>
      <p>We will reach out to confirm the appointment soon.</p>
      <p>Thank you!</p>`
    );

    sendMail(
      personDetails.email,
      "Appointment request received",
      `<p>Hi ${personDetails.name},</p>
      <p>You have a new appointment request from ${userDetails.userName} on ${appointmentDate} at ${appointmentTime}.</p>
      <p>User details: Email - ${userDetails.email}, Contact - ${userDetails.contact}</p>
      <p>Please confirm the appointment at your earliest convenience.</p>
      <p>Regards,</p>
      <b>Appointment System</b>`
    );

    return "Your appointment request has been successfully submitted. We'll contact you soon.";
  } catch (error) {
    throw error;
  }
}
