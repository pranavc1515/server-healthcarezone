import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../utilities/api.js";
import "../../stylesheets/service-providers.css";
import Toast from "../elements/toast.jsx";
import url from "../../utilities/global.env.js";

import Header from "../layout/header";
import Footer from "../layout/footer";

const BookAppointment = () => {
  const { serviceProviderId } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState({});

  // form
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");

  // console.log("doctor", doctors);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userDetails = JSON.parse(
      localStorage.getItem("healthcareZoneUserDetails")
    );
    const payload = {
      serviceProvider: selectedFacility,
      doctor: selectedDoctor,
      specialization: selectedDepartment,
      facility: selectedFacility,
      contact: contact,
      date: date,
      time: time,
      userName: userDetails.name,
      email: userDetails.email,
      role: "Patient",
    };

    axios
      .post("/facility/bookAppointment", payload)
      .then((res) => {
        window.scrollTo(0, 0);
        setToastMessage(res.data);
        setShowToast(true);
        setToastVariant("success");
        // setTimeout(() => {
        //   window.location.href = `${url.baseURL}`;
        // }, 6000);
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   axios
  //     .get(`/people/getByRole?role=${"Doctor"}`)
  //     .then((res) => {
  //       setDoctors(res?.data?.peopleDetails || []); // Set facilities data
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching facilities:", err);
  //     });
  // }, []);
  useEffect(() => {
    axios
      .get("/category/getCategories")
      .then((res) => {
        setCategories(res?.data?.allCategories || []);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      axios
        .get(`/facility/getByCategoryRef?categoryRef=${selectedDepartment}`)
        .then((res) => {
          setFacilities(res.data.facilityDetails);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedDepartment]);

  return (
    <>
      <Header />
      <Toast
        variant={toastVariant}
        showToast={showToast}
        message={toastMessage}
      />

      <div className="container">
        <div className="row align-items-center justify-content-center my-60">
          <div className="col-xl-5 col-lg-6 col-md-6">
            <div className="appointment-form form-wraper">
              <h3 className="title">Book Appointment</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <select
                    className="form-select form-control"
                    value={selectedDepartment}
                    onChange={(e) => {
                      setSelectedDepartment(e.target.value);
                    }}
                    required
                  >
                    <option value="">Select Specilization</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Hospital Name</label>
                  <select
                    className="form-select form-control"
                    value={selectedFacility}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const selectedFacility = facilities.find(
                        (facility) => facility._id === selectedId
                      );
                      setSelectedFacility(selectedId);
                      setDoctors(selectedFacility.personRef);
                    }}
                    required
                  >
                    <option value="">Select Hospital</option>
                    {facilities.map((facility) => (
                      <option key={facility._id} value={facility._id}>
                        {`${facility.name} - ${facility.address}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Doctor Name</label>
                  <select
                    className="form-select form-control"
                    value={selectedDoctor}
                    onChange={(e) => {
                      setSelectedDoctor(e.target.value);
                    }}
                    required
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor._id} value={doctor._id}>
                        {`${doctor.name} - ${doctor.role}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Select Appointment Date</label>
                  <input
                    name="AppointmentDate"
                    required
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contact"
                    name="Contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Select Appointment Time</label>
                  <input
                    name="AppointmentTime"
                    required
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="form-control"
                  />
                </div>

                <button type="submit" className="btn btn-secondary btn-lg">
                  Appointment Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookAppointment;
