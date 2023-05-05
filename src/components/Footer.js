import React from 'react'
import { useNavigate } from "react-router-dom";
export const Footer = () => {
  const navigate = useNavigate();
  const navigateToPages = (evt) => {
    evt.preventDefault();
    navigate(`/${evt.target.id}`);
  }

  return (
    <>
    <section className="section-footer">
    <div className="container">
      <div className="row">
        <div style={{display:'flex', justifyContent:'center'}}>
          <div className="widget-a" style={{textAlign:'center'}}>
            <div className="w-header-a" style={{marginTop:'-30px'}}>
              <h3 className="w-title-a text-brand">Property Portal</h3>
            </div>
            <div className="w-body-a">
              <p className="w-text-a color-text-a">
                Cloud Certitude Private Limited, 2nd-3rd Floor, B 6-7, Unique Tower,  <br />
                main, Pushkar Rd, near Bank of Baroda, Haribhau Upadhyay Nagar,  <br />
                Ajmer, Rajasthan 305001
              </p>
            </div>
            <div className="w-footer-a">
              <ul className="list-unstyled">
                <li className="color-a" style={{marginTop:'-15px'}}>
                  <span className="color-text-a">Phone : +91-9999689165</span>
                </li>
                <li className="color-a" style={{marginTop:'-10px'}}>
                  <span className="color-text-a">Email : info@propertyportal.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer>
    <div className="container" style={{marginTop:'-40px'}}>
      <div className="row">
        <div className="col-12">
          <nav className="nav-footer">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a id="/" href='/' onClick={navigateToPages}>Home</a>
              </li>
              <li className="list-inline-item">
              <a id="about" href='about' onClick={navigateToPages}>About</a>
              </li>
              <li className="list-inline-item">
              <a id="properties" href='properties' onClick={navigateToPages}>Property</a>
              </li>
              <li className="list-inline-item">
              <a id="contact" href='contact' onClick={navigateToPages}>Contact</a>
              </li>
            </ul>
          </nav>
          <div className="socials-a">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="# " onClick={e=>e.preventDefault()}>
                  <i className="bi bi-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="# " onClick={e=>e.preventDefault()}>
                  <i className="bi bi-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="# " onClick={e=>e.preventDefault()}>
                  <i className="bi bi-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="# " onClick={e=>e.preventDefault()}>
                  <i className="bi bi-linkedin" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="copyright-footer">
            <p className="copyright color-text-a">
              &copy; Copyright PropertyPortal All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
    </>
  )
}
