const facility = require("../../model/facility/facility.model.js");
const { sendMail } = require("../../utilities/sendMail.js");

module.exports = {
  addFacility,
  getByCategoryRef,
  getById,
  bookConsultant,
  bookAppointment,
};

async function addFacility(facilityDetails) {
  try {
    const newFacility = new facility(facilityDetails);
    await newFacility.save();
    return newFacility;
  } catch (error) {
    throw error;
  }
}
async function getByCategoryRef(req) {
  try {
    const { categoryRef } = req.query;

    if (!categoryRef) {
      throw new Error("Category reference is required");
    }

    // Fetch facilities based on categoryRef and populate the referenced fields
    const facilityDetails = await facility
      .find({ categoryRef: categoryRef }) // Filter by categoryRef
      .populate("serviceRef", "serviceName") // Populate service references
      .populate("cityRef", "cityName") // Populate city reference
      .populate("categoryRef", "name") // Populate category references
      .populate("personRef", "name role"); // Populate person references

    return { facilityDetails };
  } catch (error) {
    throw error;
  }
}

async function getById(req) {
  try {
    const { facilityId } = req.query;
    const facilityDetails = await facility.findOne({
      _id: facilityId,
    });
    return { facilityDetails };
  } catch (error) {
    throw error;
  }
}
async function bookConsultant(data) {
  try {
    const consultationDetails = data;

    sendMail(
      appointmentDetails.email,
      "Consultation request confirmation (Healthify app)",
      `<p style="margin-bottom:24px">Hi ${consultationDetails.name},</p>
      <p>Your request for Appointment  at  ${consultationDetails.time} has been registered.</p>
      <p>Our service Executive will reach you out as we get a slot for you.</p>
      <p style="margin-bottom:24px">Thank you for you patience and understanding</p>
      <p>Regards,</p>
      <b>Healthify Team.</b>
      `
    );
    sendMail(
      "pcp.ruff418@gmail.com",
      "Appointment request recieved (Healthify app)",
      `<p style="margin-bottom:24px">Hi Team,</p>
      <p>You have got an consultation request from ${consultationDetails.name} at ${consultationDetails.time}.</p>
      <p>The user's email is ${consultationDetails.email}, and contact is ${consultationDetails.phone}.</p>
      <p style="margin-bottom:24px">Please check your consultation log and contact to the user at consultation time (${consultationDetails.time}).</p>
      <p>Regards,</p>
      <b>Healthify Team.</b>
      `
    );
    return "We have successfully registered you request for appointment! Our customer executive will reach out to use shortly.";
  } catch (error) {
    throw error;
  }
}
async function bookAppointment(data) {
  try {
    const appointmentDetails = data;
    // console.log("appointmentDetails", appointmentDetails);

    // Fetch hospital details based on facility ID
    const Hospital = await facility.findOne({
      _id: appointmentDetails.facility,
    });
    // console.log("HospitalName", Hospital);

    // Send confirmation email to the user
    sendMail(
      appointmentDetails.email,
      "Appointment Request Confirmation (Healthify App)",
      `<p style="margin-bottom:24px">Hi ${appointmentDetails.userName},</p>
        <p>Your request for an appointment at <b>${Hospital.name}</b> has been registered.</p>
        <p><b>Appointment Details:</b></p>
        <ul>
            <li><b>Hospital:</b> ${Hospital.name}</li>
            <li><b>Address:</b> ${Hospital.address}</li>
            <li><b>Doctor:</b> ${appointmentDetails.doctor}</li>
            <li><b>Specialization:</b> ${appointmentDetails.specialization}</li>
            <li><b>Date & Time:</b> ${appointmentDetails.date} at ${appointmentDetails.time}</li>
            <li><b>Hospital Contact:</b> ${Hospital.contact}</li>
        </ul>
        <p>Our service executive will reach out to you as soon as we get a slot confirmed.</p>
        <p style="margin-bottom:24px">Thank you for your patience and understanding.</p>
        <p>Regards,</p>
        <b>Healthify Team.</b>`
    );

    // Send notification email to the company
    sendMail(
      "pcp.ruff418@gmail.com",
      "New Appointment Request Received (Healthify App)",
      `<p style="margin-bottom:24px">Hi Team,</p>
        <p>You have received a new consultation request.</p>
        <p><b>Appointment Details:</b></p>
        <ul>
            <li><b>Patient Name:</b> ${appointmentDetails.userName}</li>
            <li><b>Email:</b> ${appointmentDetails.email}</li>
            <li><b>Phone:</b> ${appointmentDetails.contact}</li>
            <li><b>Hospital:</b> ${Hospital.name}</li>
            <li><b>Address:</b> ${Hospital.address}</li>
            <li><b>Doctor:</b> ${appointmentDetails.doctor}</li>
            <li><b>Specialization:</b> ${appointmentDetails.specialization}</li>
            <li><b>Date & Time:</b> ${appointmentDetails.date} at ${appointmentDetails.time}</li>
        </ul>
        <p style="margin-bottom:24px">Please check the consultation log and contact the user at the scheduled time.</p>
        <p>Regards,</p>
        <b>Healthify Team.</b>`
    );

    return "We have successfully registered your request for an appointment! Our customer executive will reach out to you shortly.";
  } catch (error) {
    throw error;
  }
}
