import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { AdminHeader } from './AdminHeader';
import { Footer } from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createCase } from '../store/actions/propertyAction';
export const Contact = () => {
  const caseResponse = useSelector((state) => state?.caseReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    window.scrollTo(0, 0)
   },[]);

  useEffect(() => {
    if(caseResponse?.data){
      toast.success('Request Submitted Successfully', {autoClose: 3000,});
    }
    else if(caseResponse?.error){

    }
  }, [caseResponse]);
  
  const hd = () => {
    const raw = JSON.stringify({
      contactPost   : 'MESSAGE BY CONTACT',
      name          : document.getElementsByName('name')[0].value,
      email         : document.getElementsByName('email')[0].value,
      subbject      :document.getElementsByName('subject')[0].value,
      message       : document.getElementsByName('message')[0].value
  });
  console.log(raw)
  validate() && dispatch(createCase(raw));
  }
  const navigateToPages = (evt) => { 
    evt.preventDefault();
    navigate(`/${evt.target.id}`);
  }

  const validate = () =>{
     if (document.getElementsByName('name')[0].value.length === 0 || document.getElementsByName('name')[0].value.charAt(0) === ' ') {
       toast.error('Please Enter Name');
       document.getElementsByName('name')[0].focus();
       document.getElementsByName('name')[0].scrollIntoView();
       return false;
     }
     if (!document.getElementsByName('email')[0].value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      toast.error('Please Enter Valid Email');
      document.getElementsByName('email')[0].focus();
       document.getElementsByName('email')[0].scrollIntoView();
      return false;
    }
    if (document.getElementsByName('subject')[0].value.length === 0 || document.getElementsByName('subject')[0].value.charAt(0) === ' ') {
      toast.error('Please Enter Valid Subject');
      document.getElementsByName('subject')[0].focus();
       document.getElementsByName('subject')[0].scrollIntoView();
      return false;
    }
    if (document.getElementsByName('message')[0].value.length === 0 || document.getElementsByName('message')[0].value.charAt(0) === ' ') {
      toast.error('Please Enter Valid Message');
      document.getElementsByName('message')[0].focus();
       document.getElementsByName('message')[0].scrollIntoView();
      return false;
    }
    return true;
  }
  return (
    <>
    <AdminHeader active="contact"/>
    <ToastContainer  position="top-center"  reverseOrder={false} style={{width:'47vh'}} />
        {caseResponse?.loading && <div className="loading d-inline">Loading&#8230;</div>}
        <section className="intro-single">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-8">
            <div className="title-single-box">
              <h1 className="title-single">Contact US</h1>
              <span className="color-text-a">Aut voluptas consequatur unde sed omnis ex placeat quis eos. Aut natus officia corrupti qui autem fugit consectetur quo. Et ipsum eveniet laboriosam voluptas beatae possimus qui ducimus. Et voluptatem deleniti. Voluptatum voluptatibus amet. Et esse sed omnis inventore hic culpa.</span>
            </div>
          </div>
          <div className="col-md-12 col-lg-4">
            <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/" id='/' onClick={navigateToPages}>Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Contact
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </section>

   
    <section className="contact">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="contact-map box">
              <div id="map" className="contact-map">
                <iframe title="googleMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.3548040083683!2d74.6095800149074!3d26.476518685105514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396be76eeccaa9af%3A0x7736f30ba565ff87!2sCloud%20Certitude%20Private%20Limited!5e0!3m2!1sen!2sin!4v1669898145950!5m2!1sen!2sin" width="100%" height="450" frameBorder="0" style={{border:0}} allowFullScreen></iframe>
                
              </div>
            </div>
          </div>
          <div className="col-sm-12 section-t8">
            <div className="row">
              <div className="col-md-7">
                <form  method="post" className="php-email-form">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <input type="text" name="name" className="form-control form-control-lg form-control-a" placeholder="Your Name" required/>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <input name="email" type="email" className="form-control form-control-lg form-control-a" placeholder="Your Email" required/>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <input type="text" name="subject" className="form-control form-control-lg form-control-a" placeholder="Subject" required/>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea name="message" className="form-control" cols="45" rows="8" placeholder="Message" required></textarea>
                      </div>
                    </div>
                    <div className="col-md-12 my-3">
                      <div className="mb-3">
                        <div className="loading">Loading</div>
                        <div className="error-message"></div>
                        <div className="sent-message">Your message has been sent. Thank you!</div>
                      </div>
                    </div>

                    
                  </div>
                </form>
                <div className="text-center">
                    <button className="btn btn-a" onClick={hd} >Send Message</button>
                    </div>
              </div>
              <div className="col-md-5 section-md-t3">
                <div className="icon-box section-b2">
                  <div className="icon-box-icon">
                    <span className="bi bi-envelope"></span>
                  </div>
                  <div className="icon-box-content table-cell">
                    <div className="icon-box-title">
                      <h4 className="icon-title">Say Hello</h4>
                    </div>
                    <div className="icon-box-content">
                      <p className="mb-1">Email.
                        <span className="color-a">contact@example.com</span>
                      </p>
                      <p className="mb-1">Phone.
                        <span className="color-a">+54 356 945234</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="icon-box section-b2">
                  <div className="icon-box-icon">
                    <span className="bi bi-geo-alt"></span>
                  </div>
                  <div className="icon-box-content table-cell">
                    <div className="icon-box-title">
                      <h4 className="icon-title">Find us in</h4>
                    </div>
                    <div className="icon-box-content">
                      <p className="mb-1">
                      Cloud Certitude Private Limited <br />
                      2nd-3rd Floor, B 6-7, Unique Tower,  <br />
                      main, Pushkar Rd, near Bank of Baroda,  <br />
                      Haribhau Upadhyay Nagar,  <br />
                      Ajmer, Rajasthan 305001
                        
                      </p>
                    </div>
                  </div>
                </div>
                <div className="icon-box">
                  <div className="icon-box-icon">
                    <span className="bi bi-share"></span>
                  </div>
                  <div className="icon-box-content table-cell">
                    <div className="icon-box-title">
                      <h4 className="icon-title">Social networks</h4>
                    </div>
                    <div className="icon-box-content">
                      <div className="socials-footer">
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <a href="# " className="link-one" onClick={(e)=> e.preventDefault()}>
                              <i className="bi bi-facebook" aria-hidden="true"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="# " className="link-one" onClick={(e)=> e.preventDefault()}>
                              <i className="bi bi-twitter" aria-hidden="true"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="# " className="link-one" onClick={(e)=> e.preventDefault()}>
                              <i className="bi bi-instagram" aria-hidden="true"></i>
                            </a>
                          </li>
                          <li className="list-inline-item">
                            <a href="# " className="link-one" onClick={(e)=> e.preventDefault()}>
                              <i className="bi bi-linkedin" aria-hidden="true"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  )
}
