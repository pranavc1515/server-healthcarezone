import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const AddServices = () => {
  const { categoryRef } = useParams();
  const [cities, setCities] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState("");

  useEffect(() => {
    axios.get("/city/getCities").then((res) => {
      setCities(res.data.allCities);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target.elements;
    const body = { cityRef: [], categoryRef: [categoryRef] };
    for (let i = 0; i < data.length - 1; i++) {
      if (data[i].name === "cityRef") {
        body.cityRef.push(data[i].value);
      } else {
        body[data[i].name] = data[i].value;
        data[i].value = "";
      }
    }
    axios
      .post("/service/addService", body)
      .then(() => {
        setToastMessage("A new service has been added!");
        setToastVariant("success");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header />
      <div className="Toast">
        <Toast
          variant={toastVariant}
          showToast={showToast}
          message={toastMessage}
        />
      </div>
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
                      <h3 className="title">Add new service</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Provide a service name"
                            name="serviceName"
                          />
                        </div>
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            placeholder="Write a short description about the service"
                            name="shortDesc"
                          />
                        </div>
                        <b
                          style={{
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            marginBottom: "16px",
                          }}
                        >
                          Select cities under this service
                        </b>
                        <div
                          className="form-group"
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2,1fr)",
                            gap: "20px",
                          }}
                        >
                          {cities.map((ele) => (
                            <label key={ele._id}>
                              <input
                                type="checkbox"
                                name="cityRef"
                                value={ele._id}
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

export default AddServices;
