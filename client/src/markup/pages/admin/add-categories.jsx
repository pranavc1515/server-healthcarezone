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

const AddCategory = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState("");
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    axios.get("/service/getServices").then((res) => {
      setServices(res?.data?.allServices);
    });
  }, []);

  const handleServiceSelection = (e) => {
    const { value, checked } = e.target;
    setSelectedServices((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target.elements;
    const body = {
      services: selectedServices,
    };
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i].name !== "cityRef") {
        body[data[i].name] = data[i].value;
        data[i].value = "";
      }
    }
    axios
      .post("/category/addCategory", body)
      .then((res) => {
        setToastMessage(`${res.data.name} has been added as a new category`);
        setToastVariant("success");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        setSelectedServices([]);
      })
      .catch((err) => {
        if (err.response?.data?.message?.includes("duplicate")) {
          setToastMessage("The category name you have entered already exists!");
          setToastVariant("danger");
          setShowToast(true);
        }
      });
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
                      <h3 className="title">Add new specialization</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter specialization name"
                            name="name"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the description of the category"
                            name="description"
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
                          {services.map((ele) => (
                            <label key={ele._id}>
                              <input
                                type="checkbox"
                                name="cityRef"
                                value={ele._id}
                                className="m-2"
                                onChange={handleServiceSelection}
                                checked={selectedServices.includes(ele._id)}
                              />
                              {ele.serviceName}
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

export default AddCategory;
