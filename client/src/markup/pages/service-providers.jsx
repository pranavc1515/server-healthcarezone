import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../utilities/api.js";
import "../../stylesheets/service-providers.css";
import ReactStars from "react-stars";

import Header from "../layout/header";
import Footer from "../layout/footer";

const ServiceProviders = () => {
  const { serviceRef } = useParams();
  const [serviceProviders, setServiceProviders] = useState([]);

  useEffect(() => {
    axios
      .get(`/facility/getByCategoryRef?categoryRef=${serviceRef}`)
      .then((res) => {
        setServiceProviders(res.data.facilityDetails);
      })
      .catch((err) => console.log(err));
  }, [serviceRef]);

  return (
    <>
      <Header />
      <section className="section-area section-sp1">
        <div className="container">
          <div id="service-provider-list">
            {serviceProviders.map((ele) => (
              <div key={ele._id}>
                <img
                  src="https://imgs.search.brave.com/stdJivmTIzNwJS7C8qqAv6gW53Trkx3VLnzvRErRk3U/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMx/MjcwNjQxMy9waG90/by9tb2Rlcm4taG9z/cGl0YWwtYnVpbGRp/bmcuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPW9VSUxza210/YVBpQTcxMURQNTNE/RmhPVXZFN3BmZE5l/RUs5Q2Z5eGxHaW89"
                  alt="hospital_picture"
                />
                <b className="hospital-name">{ele.name}</b>
                <ReactStars
                  count={5}
                  value={ele.rating}
                  size={20}
                  edit={false}
                />
                <p>
                  <span style={{ fontWeight: 600 }}>About us : </span>
                  {ele.shortDesc}
                </p>
                <Link to={`/bookAppointment/${ele._id}`}>
                  <button className="btn btn-secondary btn-lg">
                    Book Appointment
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ServiceProviders;
