import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../../utilities/api.js";
// Layout
import Header from "../../layout/header";
import Footer from "../../layout/footer";
// Import Images
import bnrImg1 from "../../../images/banner/img1.jpg";
import waveBlue from "../../../images/shap/wave-blue.png";
import circleDots from "../../../images/shap/circle-dots.png";
import plusBlue from "../../../images/shap/plus-blue.png";
import "../../../stylesheets/admin.css";

const AllServices = () => {
  const { categoryRef } = useParams();
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    axios
      .get(`/category/getByServiceRef?serviceRef=${categoryRef}`)
      .then((res) => {
        setAllServices(res.data.categoryByServiceRef);
      })
      .catch((err) => console.log(err));
  }, [categoryRef]);

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
                <div className="row">
                  {!allServices.length ? (
                    allServices.map((ele) => (
                      <div key={ele._id} className="col-lg-4 col-md-6 mb-30">
                        <div className="feature-container feature-bx2 feature1">
                          <div className="icon-content">
                            <h3 className="ttr-title">
                              {ele.categoryName || "categoryName"}
                            </h3>
                            <p className="line-clamp">
                              {ele.shortDesc || "shortDesc"}
                            </p>
                            <Link
                              to={`/admin/add-service-provider/${ele.serviceRef[0]}/${ele._id}`}
                              className="btn btn-primary light"
                            >
                              Onboard service provider
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h3>
                      Oops.. No services have been added yet. Please add some
                      services first to proceed further.
                    </h3>
                  )}
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

export default AllServices;
