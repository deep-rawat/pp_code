import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminHeader } from "./AdminHeader";
import { Footer } from "./Footer";
import { useSelector } from "react-redux";
export const Home = () => {
  const navigate = useNavigate();
  const [propertyWrapList, setPropertyWrapList] = useState([]);
  const propertyData = useSelector((state) => state?.propertyData?.data?.propertyWrapList);

  useEffect(() => {
    window.intializePage();
  }, []);
  
  useEffect(() => {
    const temp = [];
    for(let i=0; propertyData?.length > 4 && i<4; i++){
      temp.push(propertyData?.[i]);
    }
    setPropertyWrapList(temp);
  }, [propertyData]);
  
  const navigateToPages = (evt) => {
    evt.preventDefault();
    navigate(`/${evt.target.id}`);
  };

  const navigateToSingleProperties = (idx) => {
    navigate("/property", { state: { idx: idx, prevPath: window.location.pathname } });
  };

  return (
    <>
      <AdminHeader active="home" />
      <div className="intro intro-carousel swiper position-relative">
        <div className="swiper-wrapper">
          <div className="swiper-slide carousel-item-a intro-item bg-image" style={{ backgroundImage: "url(assets/img/slide-1.jpg)" }}>
            <div className="overlay overlay-a"></div>
            <div className="intro-content display-table">
              <div className="table-cell">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="intro-body">
                        <p className="intro-title-top">
                          Doral, Florida
                          <br /> 78345
                        </p>
                        <h1 className="intro-title mb-4 ">
                          <span className="color-b">204 </span> Mount
                          <br /> Olive Road Two
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-slide carousel-item-a intro-item bg-image" style={{ backgroundImage: "url(assets/img/slide-2.jpg)" }}>
            <div className="overlay overlay-a"></div>
            <div className="intro-content display-table">
              <div className="table-cell">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="intro-body">
                        <p className="intro-title-top">
                          Doral, Florida
                          <br /> 78345
                        </p>
                        <h1 className="intro-title mb-4">
                          <span className="color-b">204 </span> Rino
                          <br /> Venda Road Five
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-slide carousel-item-a intro-item bg-image" style={{ backgroundImage: "url(assets/img/slide-3.jpg)" }}>
            <div className="overlay overlay-a"></div>
            <div className="intro-content display-table">
              <div className="table-cell">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="intro-body">
                        <p className="intro-title-top">
                          Doral, Florida
                          <br /> 78345
                        </p>
                        <h1 className="intro-title mb-4">
                          <span className="color-b">204 </span> Alira
                          <br /> Roan Road One
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper-pagination"></div>
      </div>
      <main>
        <section className="section-services section-t8">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title-wrap d-flex justify-content-between">
                  <div className="title-box">
                    <h2 className="title-a">Our Services</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="card-box-c foo">
                  <div className="card-header-c d-flex">
                    <div className="card-box-ico">
                      <span className="bi bi-cart"></span>
                    </div>
                    <div className="card-title-c align-self-center">
                      <h2 className="title-c">Lifestyle</h2>
                    </div>
                  </div>
                  <div className="card-body-c">
                    <p className="content-c">Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.</p>
                  </div>
                  <div className="card-footer-c">
                    <a href="/" className="link-c link-icon" onClick={(e) => e.preventDefault()}>
                      Read more
                      <span className="bi bi-chevron-right"></span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-box-c foo">
                  <div className="card-header-c d-flex">
                    <div className="card-box-ico">
                      <span className="bi bi-calendar4-week"></span>
                    </div>
                    <div className="card-title-c align-self-center">
                      <h2 className="title-c">Loans</h2>
                    </div>
                  </div>
                  <div className="card-body-c">
                    <p className="content-c">Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
                  </div>
                  <div className="card-footer-c">
                    <a href="/" className="link-c link-icon" onClick={(e) => e.preventDefault()}>
                      Read more
                      <span className="bi bi-calendar4-week"></span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card-box-c foo">
                  <div className="card-header-c d-flex">
                    <div className="card-box-ico">
                      <span className="bi bi-card-checklist"></span>
                    </div>
                    <div className="card-title-c align-self-center">
                      <h2 className="title-c">Sell</h2>
                    </div>
                  </div>
                  <div className="card-body-c">
                    <p className="content-c">Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.</p>
                  </div>
                  <div className="card-footer-c">
                    <a href="/" className="link-c link-icon" onClick={(e) => e.preventDefault()}>
                      Read more
                      <span className="bi bi-chevron-right"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-property section-t8">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="title-wrap d-flex justify-content-between">
                  <div className="title-box">
                    <h2 className="title-a">Latest Properties</h2>
                  </div>
                  <div className="title-link">
                    <a href="properties" id="properties" onClick={navigateToPages}>
                      All Property
                      <span className="bi bi-chevron-right"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div id="property-carousel" className="swiper">
              <div className="swiper-wrapper">
                {propertyWrapList?.map((property, i) => (
                  
                  <div className="carousel-item-b swiper-slide" key={i}>
                    <div className="card-box-a card-shadow">
                      <div className="img-box-a">
                        <img src={property?.imageUrlList?.[0]} alt="" className="img-a img-fluid" style={{ height: "30em", width: "60em" }} />
                      </div>
                      <div className="card-overlay">
                        <div className="card-overlay-a-content">
                          <div className="card-header-a">
                            <h2 className="card-title-a">
                              <span onClick={() => navigateToSingleProperties(i)} style={{ cursor: "pointer" }}>
                                {property?.propertyObj?.Name}
                              </span>
                            </h2>
                          </div>
                          <div className="card-body-a">
                            <div className="price-box d-flex">
                              <span className="price-a">&#8377; {property?.propertyObj?.PP_Basic_Sales_Price__c}</span>
                            </div>
                            <span onClick={() => navigateToSingleProperties(i)} style={{ cursor: "pointer" }} className="link-a">
                              Click here to view
                              <span className="bi bi-chevron-right"></span>
                            </span>
                          </div>
                          <div className="card-footer-a">
                            <ul className="card-info d-flex justify-content-around">
                              <li>
                                <h4 className="card-info-title">Category</h4>
                                <span>{property?.propertyObj?.PP_Category__c}</span>
                              </li>
                              <li>
                                <h4 className="card-info-title">Status</h4>
                                <span>{property?.propertyObj?.PP_Property_Status__c}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="propery-carousel-pagination carousel-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
              <span className="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 1"></span>
              <span className="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 2"></span>
              <span className="swiper-pagination-bullet swiper-pagination-bullet-active" tabindex="0" role="button" aria-label="Go to slide 3" aria-current="true"></span>
              <span className="swiper-pagination-bullet" tabindex="0" role="button" aria-label="Go to slide 4"></span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
