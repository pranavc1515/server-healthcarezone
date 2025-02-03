import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import axios from "../../utilities/api.js";

// Layout
import Header from "../layout/header";
import Footer from "../layout/footer";

// Import Images
import servicesPic1 from "../../images/services/pic1.jpg";
import pdf from "../../images/icon/pdf.png";
import doc from "../../images/icon/doc.png";

const ServiceDetail = () => {
  const { categoryRef } = useParams();
  const [services, setServices] = useState([]);
  const [faqs] = useState([
    {
      question: "What is Health Care Zone?",
      answer:
        "Health Care Zone is an online and offline interconnected platform that provides all health services on a single click at your doorstep in a feasible language.",
    },
    {
      question: "What services does Health Care Zone offer?",
      answer:
        "Health Care Zone offers a comprehensive range of health services including hospital services, medical consultations, laboratory tests, blood bank access, ambulance services, and more.",
    },
    {
      question: "How does Health Care Zone remind me of my appointments?",
      answer:
        "Health Care Zone has a built-in reminder system for appointments. You'll receive notifications to help you keep track of your scheduled medical visits.",
    },
    {
      question: "Is Health Care Zone available in multiple languages?",
      answer:
        "Yes, Health Care Zone offers a multilingual network, making healthcare more accessible and understandable for a diverse population.",
    },
  ]);

  useEffect(() => {
    axios
      .get(`/category/getByServiceRef?serviceRef=${categoryRef}`)
      .then((res) => {
        setServices(res.data.categoryByServiceRef);
      })
      .catch((err) => console.log(err));
  }, [categoryRef]);

  return (
    <>
      <Header />
      <div className="page-content bg-white">
        <section className="section-area section-sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mb-30">
                <div className="ttr-media mb-30">
                  <img src={servicesPic1} className="rounded" alt="" />
                </div>
                <div className="clearfix">
                  <div className="head-text mb-30">
                    <h2 className="title mb-15">
                      Why Medical Had Been So Popular Till
                    </h2>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book
                    </p>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-md-6 mb-30">
                      <ul className="list-check-squer mb-0">
                        <li>Then along come two they</li>
                        <li>That’s just a little bit more than</li>
                        <li>Standard dummy text ever since</li>
                        <li>Simply dummy text of the printing</li>
                        <li>Make a type specimen book</li>
                      </ul>
                    </div>
                    <div className="col-md-6 mb-30">
                      <div className="skillbar-box mb-30">
                        <h6 className="title">Advanced Technology</h6>
                        <div className="skillbar appear">
                          <p
                            className="skillbar-bar"
                            style={{ width: "96%" }}
                          ></p>
                          <span className="skill-bar-percent">96%</span>
                        </div>
                      </div>
                      <div className="skillbar-box mb-30">
                        <h6 className="title">Certified Engineers</h6>
                        <div className="skillbar appear">
                          <p
                            className="skillbar-bar"
                            style={{ width: "79%" }}
                          ></p>
                          <span className="skill-bar-percent">79%</span>
                        </div>
                      </div>
                      <div className="skillbar-box mb-0">
                        <h6 className="title">6 years Experience</h6>
                        <div className="skillbar appear">
                          <p
                            className="skillbar-bar"
                            style={{ width: "75%" }}
                          ></p>
                          <span className="skill-bar-percent">75%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clearfix">
                  <div className="head-text mb-30">
                    <h4 className="title mb-10">Popular Questions</h4>
                    <p className="mb-0">
                      Standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book
                    </p>
                  </div>
                  <Accordion
                    defaultActiveKey="0"
                    className="accordion ttr-accordion1"
                  >
                    {faqs.map((faq, index) => (
                      <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>{faq.question}</Accordion.Header>
                        <Accordion.Body>
                          <p className="mb-0">{faq.answer}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              </div>
              <div className="col-lg-4">
                <aside className="sticky-top pb-1">
                  <div className="widget">
                    <ul className="service-menu">
                      {services.map((ele) => (
                        <li key={ele._id}>
                          <Link to={`/serviceProviders/${ele._id}`}>
                            <span>{ele.categoryName}</span>
                            <i className="fa fa-angle-right"></i>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="widget">
                    <div className="brochure-bx">
                      <h5 className="title-head">Download</h5>
                      <Link to="#" className="download-link">
                        <img src={pdf} alt="" />
                        <h5 className="title">Download our Brochures</h5>
                        <span>Download</span>
                      </Link>
                      <Link to="#" className="download-link">
                        <img src={doc} alt="" />
                        <h5 className="title">Our Company Details</h5>
                        <span>Download</span>
                      </Link>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ServiceDetail;
