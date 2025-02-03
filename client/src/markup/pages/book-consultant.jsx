import React, { useEffect, useState } from "react";
import axios from "../../utilities/api.js";

// Layout
import Header from "../layout/header";
import Footer from "../layout/footer";

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";

const Booking = () => {
  const [categories, setCategories] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");

  // Fetch categories for the "Select Department" dropdown.
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
  // Fetch facilities based on selected category

  // Handler for form submission.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare payload.
    const payload = {
      specilization: selectedDepartment,
      issue: issue,
      name: name,
      phone: phone,
      time: time,
      email: email,
    };

    // Post the appointment using axios.
    axios
      .post("/facility/bookConsultant", payload)
      .then((res) => {
        console.log("Appointment created successfully:", res.data);
        // Optionally, clear the form or redirect the user.
      })
      .catch((err) => {
        console.error("Error creating appointment:", err);
      });
  };

  return (
    <>
      <Header />

      <div className="page-content bg-white">
        <div className="banner-wraper">
          <div
            className="page-banner"
            style={{ backgroundImage: `url(${bnrImg1})` }}
          >
            <section className="section-area section-sp2 appointment-wraper">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-5 col-lg-6 col-md-6">
                    <div className="appointment-form form-wraper">
                      <h3 className="title">Schedule consultation call</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>

                        {/* <div className="form-group">
                          <input
                            type="date"
                            className="form-control"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                          />
                        </div> */}
                        <div className="form-group">
                          <input
                            required
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="form-control"
                          />
                        </div>
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
                          <input
                            type="issue"
                            className="form-control"
                            placeholder="Health Issue"
                            value={issue}
                            onChange={(e) => setIssue(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-secondary btn-lg"
                        >
                          Schedule call
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <img className="pt-img1 animate-wave" src={waveBlue} alt="Wave" />
            <img
              className="pt-img2 animate2"
              src={circleDots}
              alt="Circle Dots"
            />
            <img className="pt-img3 animate-rotate" src={plusBlue} alt="Plus" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Booking;
