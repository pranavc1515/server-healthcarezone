import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "../../utilities/api.js";
import url from "../../utilities/global.env.js";

// Import Images
import logo from "../../images/logo-light.webp";

// Layout
import Header from "../layout/header.jsx";
import Footer from "../layout/footer.jsx";
import Toast from "../elements/toast.jsx";

// Import Images
import bnrImg1 from "../../images/banner/img1.jpg";
import waveBlue from "../../images/shap/wave-blue.png";
import circleDots from "../../images/shap/circle-dots.png";
import plusBlue from "../../images/shap/plus-blue.png";

const FormLogin = () => {
  const location = useLocation();
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState("");

  useEffect(() => {
    const prompt = new URLSearchParams(location.search).get("prompt");
    if (prompt) {
      setToastMessage(
        "You need to login first before using our services, thank you!"
      );
      setShowToast(true);
      setToastVariant("danger");
      setTimeout(() => setShowToast(false), 3500);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target.elements;
    const body = {};
    for (let i = 0; i < data.length - 1; i++) {
      body[data[i].name] = data[i].value;
    }
    axios
      .post("/user/auth/login", body)
      .then((res) => {
        const { token, registeredUser } = res.data;
        localStorage.setItem("healthcareZoneToken", token);
        localStorage.setItem(
          "healthcareZoneUserDetails",
          JSON.stringify(registeredUser)
        );
        setToastMessage("You have been successfully logged-in !");
        setShowToast(true);
        setToastVariant("success");
        setTimeout(() => {
          window.location.href = `${url.baseURL}`;
        }, 2000);
      })
      .catch((err) => {
        setToastMessage(err.response.data.message);
        setShowToast(true);
        setToastVariant("danger");
        setTimeout(() => setShowToast(false), 3000);
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
                      <div className="logo">
                        <img src={logo} alt="" />
                      </div>
                      <br />
                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            name="email_contact"
                            required
                            className="form-control"
                            placeholder="Please enter your email/contact"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            required
                            className="form-control"
                            placeholder="Please enter your password"
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn mb-30 btn-lg btn-primary w-100"
                        >
                          Login
                        </button>
                      </form>
                      <Link to="/form-forget-password">Forgot Password</Link>
                      <br />
                      <div className="text-center mt-40">
                        <p className="mt-0">Don't have an account?</p>
                        <Link
                          className="btn btn-lg btn-secondary w-100"
                          data-toggle="tab"
                          to="/sign-up"
                        >
                          Sign-up
                        </Link>
                      </div>
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

export default FormLogin;
