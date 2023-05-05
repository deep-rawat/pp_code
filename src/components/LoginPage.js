import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./loginassets/vendor/bootstrap/css/bootstrap.min.css";
import "./loginassets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./loginassets/vendor/boxicons/css/boxicons.min.css";
import "./loginassets/vendor/quill/quill.snow.css";
import "./loginassets/vendor/quill/quill.bubble.css";
import "./loginassets/vendor/remixicon/remixicon.css";
import "./loginassets/vendor/simple-datatables/style.css";
import "./loginassets/css/style.css";
import "./LoginPage.css";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../store/actions/loginUserAction";
export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logo = require("./loginassets/img/logo.png");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");


  const loginUserData = useSelector((state) => state?.loginUser);

  useEffect(() => {
    showSpinner(loginUserData?.loading);
    if (loginUserData?.data != null) {
      navigate("/");
    }
  }, [loginUserData]);

  const showSpinner = (show) => {
    const spinner = document.getElementById("spinner");
    show ? spinner.classList.remove("d-none") : spinner.classList.add("d-none");
  };

  const redirectToHome = () => {
    const raw = {
      username: "saurabh@gmail.com",
      password: "mM0)0987",
    };
    dispatch(loginUser(raw));
  };
  const validateEmailOnBlur = (evt) => {
    if (evt.target.value !== "" && !evt.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      evt.target.classList.add("input-focus-color");
      setEmailErrorMsg("Please enter valid email address");
    }
  };
  const handleInputValueChange = (evt) => {
    evt.target.name === "email" ? setEmail(evt.target.value) : setPassword(evt.target.value);
    let errorMsg = evt.target.name === "email" ? setEmailErrorMsg : setPasswordErrorMsg;
    if (evt.target.value === "" || evt.target.value == null) {
      errorMsg("Please enter a value");
      evt.target.classList.add("input-focus-color");
    } else {
      evt.target.classList.remove("input-focus-color");
      errorMsg("");
    }
  };

  const submitDetails = () => {
    let emailInput = document.getElementById("typeEmailX");
    let passwordInput = document.getElementById("typePasswordX");
    if (email !== "" && password !== "") {
      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        emailInput.classList.add("input-focus-color");
        setEmailErrorMsg("Please enter valid email address");
        return false;
      }
      dispatch(loginUser({username: email, password}));
    } else {
      if (email === "" || email == null) {
        emailInput.classList.add("input-focus-color");
        setEmailErrorMsg("Please enter a value");
      } else if (password === "" || password == null) {
        passwordInput.classList.add("input-focus-color");
        setPasswordErrorMsg("Please enter a value");
        if (email != null && !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
          emailInput.classList.add("input-focus-color");
          setEmailErrorMsg("Please enter valid email address");
          return false;
        }
      }
    }
  };
  return (
    <>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <span className="logo d-flex align-items-center w-auto">
                    <img src={logo} alt="" />
                    <span className="d-none d-lg-block">Property Portal</span>
                  </span>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                      <p className="text-center small">Enter your emal & password to login</p>
                    </div>
                    <form className="row g-3">
                      <div className="col-12">
                        <label htmlFor="yourEmail" className="form-label">
                          Email
                        </label>
                        <div className="input-group has-validation">
                          <span className="input-group-text" id="inputGroupPrepend">
                            @
                          </span>
                          <input type="email" name="email" className="form-control" id="typeEmailX" value={email} onChange={handleInputValueChange} onBlur={validateEmailOnBlur} />
                        </div>
                      </div>
                      <p style={{ textAlign: "center", color: "red" }}> {emailErrorMsg} </p>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">
                          Password
                        </label>
                        <input type="password" name="password" className="form-control" id="typePasswordX" value={password} onChange={handleInputValueChange} />
                      </div>
                      <p style={{ textAlign: "center", color: "red" }}> {passwordErrorMsg} </p>
                    </form>
                    <div className="col-12">
                      <button className="btn btn-primary w-100" onClick={submitDetails}>
                        Login
                      </button>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100 mt-2 btn-success" onClick={redirectToHome}>
                        Master Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="loading d-none" id="spinner">
          Loading&#8230;
        </div>
      </div>
    </>
  );
};
