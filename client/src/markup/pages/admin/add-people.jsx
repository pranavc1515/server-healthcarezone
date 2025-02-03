import React, { useState, useEffect } from "react";
import axios from "../../../utilities/api.js";
// Layout
import Header from "../../layout/header";
import Footer from "../../layout/footer";
// Import Images
import bnrImg1 from "../../../images/banner/img1.jpg";
import waveBlue from "../../../images/shap/wave-blue.png";
import circleDots from "../../../images/shap/circle-dots.png";
import plusBlue from "../../../images/shap/plus-blue.png";
import Toast from "../../elements/toast.jsx";

const AddPeople = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [categories, setCategories] = useState([]);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the payload for the API request
    const payload = {
      name,
      description,
      role,
      contact,
      age,
      email,
      categoryRef: selectedDepartment,
    };

    // Post the data to the backend API
    axios
      .post("/people/addPeople", payload)
      .then((res) => {
        setToastMessage("A new person has been added!");
        setToastVariant("success");
        setShowToast(true);
        // Optionally, clear the form or redirect the user
      })
      .catch((err) => {
        console.error("Error adding person:", err);
      });
  };
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
  return (
    <>
      <Header />
      <Toast
        variant={toastVariant}
        showToast={showToast}
        message={toastMessage}
      />
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
                      <h3 className="title">Add New Person</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <textarea
                            className="form-control"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <select
                            className="form-select form-control"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                          >
                            <option value="">Select Role</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Nurse">Nurse</option>
                            <option value="Driver">Driver</option>
                            <option value="Security">Security</option>
                            <option value="Pharmacist">Pharmacist</option>
                          </select>
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
                            type="text"
                            className="form-control"
                            placeholder="Contact Number"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
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
                          Add Person
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

export default AddPeople;
