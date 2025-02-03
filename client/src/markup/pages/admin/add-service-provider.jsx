import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";

// import { useLocation } from "react-router-dom";
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

const AddServiceProvider = () => {
  // const location = useLocation();
  // const serviceId = location.pathname.split("/").pop();
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target.elements;
    const body = {
      serviceRef: selectedServices,
      cityRef: selectedCity,
      categoryRef: selectedCategories,
      personRef: selectedDoctors,
    };
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i].name && !["cityRef"].includes(data[i].name)) {
        body[data[i].name] = data[i].value;
      }
      data[i].value = "";
    }
    axios
      .post("/facility/addFacility", body)
      .then((res) => {
        setToastMessage(
          `${res.data.name} has been added as new service provider.`
        );
        setToastVariant("success");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get("/category/getCategories").then((res) => {
      setCategories(res?.data?.allCategories);
    });
  }, []);

  useEffect(() => {
    axios.get("/city/getCities").then((res) => {
      setCities(res.data.allCities);
    });
  }, []);

  useEffect(() => {
    axios.get("/service/getServices").then((res) => {
      setServices(res.data.allServices);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`/people/getByRole?role=${"Doctor"}`)
      .then((res) => {
        setDoctors(res?.data?.peopleDetails || []); // Set facilities data
      })
      .catch((err) => {
        console.error("Error fetching facilities:", err);
      });
  }, [selectedCategories]);

  const handleCategorySelection = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const handleServiceSelection = (e) => {
    const { value, checked } = e.target;
    setSelectedServices((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

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
                      <h3 className="title">Add new service provider</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter service provider's name"
                            name="name"
                          />
                        </div>
                        <div className="form-group">
                          <label>Short description</label>
                          <textarea
                            className="form-control"
                            placeholder="Write short description about service provider"
                            name="shortDesc"
                          />
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter service provider's email"
                            name="email"
                          />
                        </div>
                        <div className="form-group">
                          <label>Contact</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter service provider's contact"
                            name="contact"
                          />
                        </div>
                        <div className="form-group">
                          <label>Address</label>
                          <textarea
                            className="form-control"
                            placeholder="Enter address of service provider"
                            name="address"
                          />
                        </div>
                        {/* <div className="form-group">
                          <label>Doctor Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter doctor's name"
                            name="dr_name"
                          />
                        </div> */}
                        <div className="form-group">
                          <label>Select Doctor</label>
                          <Autocomplete
                            multiple
                            name="dr_name"
                            options={doctors}
                            getOptionLabel={(option) => option.name}
                            value={doctors.filter((doctor) =>
                              selectedDoctors.includes(doctor._id)
                            )}
                            onChange={(event, newValue) => {
                              setSelectedDoctors(
                                newValue.map((doctor) => doctor._id)
                              );
                            }}
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  {...getTagProps({ index })}
                                  label={option.name}
                                  key={option._id}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                type="text"
                                variant="standard"
                                InputProps={{
                                  ...params.InputProps,
                                  disableUnderline: true,
                                }}
                              />
                            )}
                          />
                        </div>
                        <div
                          className="form-group"
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(1,1fr)",
                            gap: "10px",
                          }}
                        >
                          <div>Select Service</div>
                          {services.map((service) => (
                            <label key={service._id}>
                              <input
                                type="checkbox"
                                // name="serviceRef"
                                value={service._id}
                                className="m-2"
                                onChange={handleServiceSelection}
                                checked={selectedServices.includes(service._id)}
                              />
                              {service.serviceName}
                            </label>
                          ))}
                        </div>
                        <div className="form-group">
                          <label>No. of Beds</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter no. of beds"
                            name="bed_count"
                          />
                        </div>
                        <div
                          className="form-group"
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(1,1fr)",
                            gap: "10px",
                          }}
                        >
                          <div>Select City</div>
                          {cities.map((city) => (
                            <label key={city._id}>
                              <input
                                type="radio"
                                // name="cityRef"
                                value={city._id}
                                className="m-2"
                                onChange={(e) =>
                                  setSelectedCity(e.target.value)
                                }
                                checked={selectedCity === city._id}
                              />
                              {city.name}
                            </label>
                          ))}
                        </div>
                        <div
                          className="form-group"
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(1,1fr)",
                            gap: "10px",
                          }}
                        >
                          <div>Select Specialization</div>

                          {categories.map((ele) => (
                            <label key={ele._id}>
                              <input
                                type="checkbox"
                                // name="categories"
                                value={ele._id}
                                className="m-2"
                                onChange={handleCategorySelection}
                                checked={selectedCategories.includes(ele._id)}
                              />
                              {ele.name}
                            </label>
                          ))}
                        </div>
                        <button
                          type="submit"
                          className="btn btn-secondary btn-lg"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <img className="pt-img1 animate-wave" src={waveBlue} alt="" />
            <img className="pt-img2 animate2" src={circleDots} alt="" />
            <img className="pt-img3 animate-rotate" src={plusBlue} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddServiceProvider;
