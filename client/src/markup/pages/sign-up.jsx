import React, { useState } from "react";
import axios from "../../utilities/api.js";
import url from "../../utilities/global.env.js";

// Layout
import Header from "../layout/header.jsx";
import Footer from "../layout/footer.jsx";
import Toast from "../elements/toast.jsx";

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";

const Booking = () => {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target.elements;
    const body = {};
    for (let i = 0; i < data.length - 1; i++) {
      body[data[i].name] = data[i].value;
    }
    axios
      .post("/user/auth/verify", body)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("healthcareZoneToken", token);
        setToastMessage("We have sent you an OTP to your contact number!");
        setShowToast(true);
        setToastVariant("success");
        setTimeout(() => {
          window.location.href = `${url.baseURL}sign-up/verify`;
        }, 4000);
      })
      .catch((err) => {
        setToastMessage(err.response.data.message);
        setShowToast(true);
        setToastVariant("danger");
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      });
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
                      <h3 className="title">Sign-up</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            name="userName"
                            required
                            className="form-control"
                            placeholder="Please Enter Your Name"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            required
                            className="form-control"
                            placeholder="Please Enter Your Email"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="number"
                            name="contact"
                            required
                            className="form-control"
                            placeholder="Please Enter Your Contact"
                          />
                        </div>
                        <div className="form-group">
                          <select
                            name="cityRef"
                            className="form-select form-control"
                            required
                          >
                            <option value="">Please Select Your City</option>
                            <option value="648eae80edf39c5a4b26016f">
                              Pune
                            </option>
                            <option value="648eae8aedf39c5a4b260171">
                              Mumbai
                            </option>
                          </select>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-secondary btn-lg"
                        >
                          Get OTP
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

export default Booking;
