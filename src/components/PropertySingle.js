import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminHeader } from "./AdminHeader";
import { Footer } from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import { createLead, resetLeadResponse } from "../store/actions/propertyAction";
export const PropertySingle = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [property, setProperty] = useState({});
  const [propertyName, setPropertyName] = useState("");
  const [description, setDescription] = useState("");

  const leadResponse = useSelector((state) => state?.leadReducer);
  const propertyWrapList = useSelector((state) => state?.propertyData?.data?.propertyWrapList);
  const loginUserContactObjData = useSelector((state) => state?.loginUser?.data);

  const index = location.state == null ? 0 : location.state.idx;

  useEffect(() => {
    const body = document.querySelector("#root");
    body.scrollIntoView(
      {
        behavior: "smooth",
      },
      500
    );
    window.intializePage();
  }, []);

  useEffect(() => {
    if (leadResponse?.data) {
      toast.success(leadResponse?.data?.substring(leadResponse?.data?.lastIndexOf("*") + 1), {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(resetLeadResponse());
    }
    showSpinner(leadResponse?.loading);
  }, [leadResponse]);

  useEffect(() => {
    setProperty(propertyWrapList?.[index || 0]);
    setPropertyName(propertyWrapList?.[index || 0]?.propertyObj?.Name);
    setDescription(`I am interested in ${propertyWrapList?.[index || 0]?.propertyObj?.Name} Property`);
  }, [propertyWrapList, index, property]);

  const showSpinner = (show) => {
    const spinner = document.getElementById("spinner");
    show ? spinner.classList.remove("d-none") : spinner.classList.add("d-none");
  };

  const handleValueChanage = (evt) => {
    const setValue = evt.target.name === "name" ? setPropertyName : setDescription;
    setValue(evt.target.value);
    if (evt.target.value != null || evt.target.value !== "") {
      document.getElementById(evt.target.id + 1).innerHTML = "";
    }
  };
  const insertLead = () => {
    const leadFields = document.getElementsByClassName("leadFields");
    let isValid = true;
    for (let i = 0; i < leadFields.length; i++) {
      const msg = document.getElementById(leadFields[i].id + 1);
      if (leadFields[i].value == null || leadFields[i].value === "") {
        msg.innerHTML = "Please enter a value";
        isValid = false;
      }
    }
    if (isValid) {
      const raw = {
        contactIdForCase: loginUserContactObjData?.Id,
        descriptionForCase: description,
        propertyIdForCase: property?.propertyObj?.Id,
      };
      dispatch(createLead(raw));
    }
  };
  return (
    <>
      <AdminHeader active="properties" />
      <ToastContainer />
      <section className="intro-single">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="title-single-box">
                <h1 className="title-single">{property?.propertyObj?.Name}</h1>
                <span className="color-text-a">Location</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="property-single nav-arrow-b">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div id="property-single-carousel" className="swiper text-center">
                <div className="swiper-wrapper">
                  {property?.imageUrlList?.map((link, i) => (
                    <div className="carousel-item-d swiper-slide" key={i}>
                      <img src={link} alt="" height={500} width={400} style={{ objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="property-single-carousel-pagination carousel-pagination"></div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="row justify-content-between">
                <div className="col-md-5 col-lg-4">
                  <div className="property-price d-flex justify-content-center foo">
                    <div className="card-header-c d-flex">
                      <div className="card-box-ico">
                        <span className="bi bi-cash">&#8377;</span>
                      </div>
                      <div className="card-title-c align-self-center">
                        <h5 className="title-c">{property?.propertyObj?.PP_Basic_Sales_Price__c}</h5>
                      </div>
                    </div>
                  </div>
                  <div className="property-summary">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="title-box-d section-t4">
                          <h3 className="title-d">Quick Summary</h3>
                        </div>
                      </div>
                    </div>
                    <div className="summary-list">
                      <ul className="list">
                        <li className="d-flex justify-content-between">
                          <strong>Property ID:</strong>
                          <span>1134</span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <strong>Location:</strong>
                          <span>Chicago, IL 606543</span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <strong>Category:</strong>
                          <span>{property?.propertyObj?.PP_Category__c}</span>
                        </li>
                        <li className="d-flex justify-content-between">
                          <strong>Status:</strong>
                          <span>{property?.propertyObj?.PP_Property_Status__c}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-lg-7 section-md-t3">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="title-box-d">
                        <h3 className="title-d">Property Description</h3>
                      </div>
                    </div>
                  </div>
                  <div className="property-description">
                    <p className="description color-text-a">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Cras ultricies ligula sed magna dictum porta. Curabitur aliquet quam id dui posuere blandit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar quam id dui posuere blandit.</p>
                    <p className="description color-text-a no-margin">Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Donec rutrum congue leo eget malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec sollicitudin molestie malesuada.</p>
                  </div>
                  <div className="row section-t3">
                    <div className="col-sm-12">
                      <div className="title-box-d">
                        <h3 className="title-d">Amenities</h3>
                      </div>
                    </div>
                  </div>
                  <div className="amenities-list color-text-a">
                    <ul className="list-a no-margin">
                      {property?.propertyObj?.PP_Amenities__c?.split(";")?.map((amenity, i) => (
                        <li key={i}>{amenity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-10 offset-md-1">
              <ul className="nav nav-pills-a nav-pills mb-3 section-t3" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="pills-video-tab" data-bs-toggle="pill" href="#pills-video" role="tab" aria-controls="pills-video" aria-selected="true" style={{ color: "black" }}>
                    Video
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="pills-plans-tab" data-bs-toggle="pill" href="#pills-plans" role="tab" aria-controls="pills-plans" aria-selected="false" style={{ color: "black" }}>
                    Floor Plans
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="pills-map-tab" data-bs-toggle="pill" href="#pills-map" role="tab" aria-controls="pills-map" aria-selected="false" style={{ color: "black" }}>
                    Location
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-video" role="tabpanel" aria-labelledby="pills-video-tab">
                  <iframe title="videoPlayer" src="https://player.vimeo.com/video/73221098" width="100%" height="460" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                </div>
                <div className="tab-pane fade" id="pills-plans" role="tabpanel" aria-labelledby="pills-plans-tab">
                  <img src="assets/img/plan2.jpg" alt="" className="img-fluid" />
                </div>
                <div className="tab-pane fade" id="pills-map" role="tabpanel" aria-labelledby="pills-map-tab">
                  <iframe title="googleMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes+Square!5e0!3m2!1ses-419!2sve!4v1510329142834" width="100%" height="460" frameBorder="0" style={{ border: 0 }} allowFullScreen></iframe>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="row section-t3">
                <div className="col-sm-12">
                  <div className="title-box-d">
                    <h3 className="title-d">Contact Agent</h3>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  <img src="assets/img/agent-4.jpg" alt="" className="img-fluid" />
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="property-agent">
                    <h4 className="title-agent">Anabella Geller</h4>
                    <p className="color-text-a">Nulla porttitor accumsan tincidunt. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Quisque velit nisi, pretium ut lacinia in, elementum id enim.</p>
                    <ul className="list-unstyled">
                      <li className="d-flex justify-content-between">
                        <strong>Phone:</strong>
                        <span className="color-text-a">(222) 4568932</span>
                      </li>
                      <li className="d-flex justify-content-between">
                        <strong>Mobile:</strong>
                        <span className="color-text-a">777 287 378 737</span>
                      </li>
                      <li className="d-flex justify-content-between">
                        <strong>Email:</strong>
                        <span className="color-text-a">annabella@example.com</span>
                      </li>
                      <li className="d-flex justify-content-between">
                        <strong>Skype:</strong>
                        <span className="color-text-a">Annabela.ge</span>
                      </li>
                    </ul>
                    <div className="socials-a">
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <a href="# " onClick={(e) => e.preventDefault()}>
                            <i className="bi bi-facebook" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="# " onClick={(e) => e.preventDefault()}>
                            <i className="bi bi-twitter" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="# " onClick={(e) => e.preventDefault()}>
                            <i className="bi bi-instagram" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href="# " onClick={(e) => e.preventDefault()}>
                            <i className="bi bi-linkedin" aria-hidden="true"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-4">
                  <div className="property-contact">
                    <form className="form-a" onSubmit={(e) => e.preventDefault()}>
                      <div className="row">
                        <div className="col-md-12 mb-1">
                          <div className="form-group">
                            <input type="text" className="form-control form-control-lg form-control-a leadFields" id="name-msg" name="name" placeholder="Name *" value={propertyName} onChange={handleValueChanage} />
                            <div className="text-center" style={{ color: "red" }}>
                              <span id="name-msg1"></span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 mb-1">
                          <div className="form-group">
                            <textarea id="message-msg" className="form-control leadFields" placeholder="Comment *" name="message" cols="45" rows="8" value={description} onChange={handleValueChanage}></textarea>
                            <div className="text-center" style={{ color: "red" }}>
                              <span id="message-msg1"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-a" onClick={insertLead}>
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="loading d-none" id="spinner">
          Loading&#8230;
        </div>
      </section>
      <Footer />
    </>
  );
};
