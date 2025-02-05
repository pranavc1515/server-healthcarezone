import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../../utilities/api.js";
// Layout
import Header from "../../layout/header.jsx";
import Footer from "../../layout/footer.jsx";
// Import Images
import bnrImg1 from "../../../images/banner/img1.jpg";
import waveBlue from "../../../images/shap/wave-blue.png";
import circleDots from "../../../images/shap/circle-dots.png";
import plusBlue from "../../../images/shap/plus-blue.png";

const Admin = () => {
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    axios
      .get("/service/getServices")
      .then((res) => {
        setAllServices(res.data.allServices);
      })
      .catch((err) => console.log(err));
  }, []);

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
                {/* <div className="row">
                  {allServices.map((ele) => (
                    <div key={ele._id} className="col-lg-4 col-md-6 mb-30">
                      <div className="feature-container feature-bx2 feature1">
                        <div className="icon-content">
                          <h3 className="ttr-title">{ele.serviceName}</h3>
                          <p className="line-clamp">{ele.shortDesc}</p>
                          <br />
                          <Link
                            to={`/admin/${ele.serviceName.toLowerCase()}/add-service-provider/${
                              ele._id
                            }`}
                            className="btn btn-primary light"
                          >
                            + Add new facilty provider
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div> */}
                <div className="col-lg-4 col-md-6 mb-30 w-100">
                  <div className="feature-container feature-bx2 feature2">
                    <div className="icon-content">
                      <h3 className="ttr-title">+ Add People</h3>
                      <p>
                        Here you can add employee details about doctor and nurse
                        from organisation.
                      </p>
                      <Link
                        to={`/admin/add-people`}
                        className="btn btn-primary light"
                      >
                        +Add Facility
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-30 w-100">
                  <div className="feature-container feature-bx2 feature2">
                    <div className="icon-content">
                      <h3 className="ttr-title">+ Add Facility</h3>
                      <p>
                        Here you can add details about Hospital and other
                        Facility.
                      </p>
                      <Link
                        to={`/admin/add-hospital`}
                        className="btn btn-primary light"
                      >
                        +Add Facility
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-30 w-100">
                  <div className="feature-container feature-bx2 feature2">
                    <div className="icon-content">
                      <h3 className="ttr-title">+ Add Specialization</h3>
                      <p>
                        Here you can add different categories like Ayurvedic,
                        dermatologist(skin) , Dentist(teeth), etc.
                      </p>
                      <Link
                        to="/admin/add-category"
                        className="btn btn-primary light"
                      >
                        +Add Specialization
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-30 mb-30 w-100">
                  <div className="feature-container feature-bx2 feature2">
                    <div className="icon-content">
                      <h3 className="ttr-title">+ Onboard new city</h3>
                      <p>
                        Here you can onboard new cities in which your services
                        are being provided.
                      </p>
                      <Link
                        to="/admin/add-city"
                        className="btn btn-primary light"
                      >
                        +Add new city
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-30 mb-30 w-100">
                  <div className="feature-container feature-bx2 feature2">
                    <div className="icon-content">
                      <h3 className="ttr-title">+ Add new service</h3>
                      <p>Here you can new service if your are expanding.</p>
                      <Link
                        to="/admin/add-service"
                        className="btn btn-primary light"
                      >
                        +Add new service
                      </Link>
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

export default Admin;
