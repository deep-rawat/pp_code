import React, { useEffect, useState } from "react";
import { AdminHeader } from "./AdminHeader";
import { Footer } from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { editProfileAction, resetEditProfileResponse, updateUserDataAction } from "../store/actions/loginUserAction";
export const ProfilePage = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const [isPassword, setIsPassword] = useState(false);
  const loginUserContactObjData = useSelector((state) => state?.loginUser?.data);
  const editProfileResponse = useSelector((state) => state?.editProfileReducer);

  const showSpinner = (show) => {
    const spinner = document.getElementById("spinner");
    show ? spinner.classList.remove("d-none") : spinner.classList.add("d-none");
  };

  useEffect(() => {
    if(editProfileResponse?.data){
      let successMessage = isPassword ? 'Your password updated successfully.' : 'Your profile updated successfully.';
      toast.success(successMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(updateUserDataAction(userData));
      dispatch(resetEditProfileResponse());
    }
    showSpinner(editProfileResponse?.loading);
  }, [editProfileResponse]);
  
  useEffect(() => {
    console.log(loginUserContactObjData);
    if (loginUserContactObjData != null) {
      setUserData({...loginUserContactObjData});
      const profileImage = document.getElementById("profilePageImage");
      profileImage.textContent = loginUserContactObjData?.FirstName?.charAt(0) + loginUserContactObjData?.LastName?.charAt(0);
    }
  }, [loginUserContactObjData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleEditMode = (evt) => {
    const elements = document.querySelectorAll(`[data-id="${evt.target.id}"]`);
    elements[0].classList.toggle("d-none");
    elements[0].focus();
    elements[1].classList.toggle("d-none");
  };
  const handleChange = (evt) => {
    userData[evt.target.dataset.name] = evt.target.value;
    if (evt.target.value !== "") {
      let errorMsg = document.querySelector(`[data-id="${evt.target.dataset.id}MSG"]`);
      evt.target.classList.remove("input-focus-color");
      errorMsg.innerHTML = "";
    }
  };
  const handleBlur = (evt) => {
    const msg = document.querySelector(`[data-id="${evt.target.id}"]`);
    if (evt.target.name === "password") {
      if (evt.target.value !== "" && evt.target.value !== userData.Password__c) {
        evt.target.classList.add("input-focus-color");
        msg.innerHTML = "Password doesn't match";
      } else if (evt.target.value === "" || evt.target.value == null) {
        evt.target.classList.add("input-focus-color");
        msg.innerHTML = "Please enter a value";
      }
    } else if (evt.target.name === "newpassword") {
      if (evt.target.value !== "" && !evt.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
        evt.target.classList.add("input-focus-color");
        msg.innerHTML = "Please enter a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter";
      } else if (evt.target.value === "" || evt.target.value == null) {
        evt.target.classList.add("input-focus-color");
        msg.innerHTML = "Please enter a value";
      }
    } else if (evt.target.name === "renewpassword") {
      const newPass = document.getElementById("newPassword");
      if (evt.target.value !== "" && evt.target.value !== newPass.value) {
        evt.target.classList.add("input-focus-color");
        msg.innerHTML = "Password doesn't match";
      } else if (evt.target.value === "" || evt.target.value == null) {
        evt.target.classList.add("input-focus-color");
        msg.innerHTML = "Please enter a value";
      }
    }
  };
  const overviewHandleBlur = (evt) => {
    let msg = document.querySelector(`[data-id="${evt.target.dataset.id}MSG"]`);
    if (evt.target.value == null || evt.target.value === "") {
      evt.target.classList.add("input-focus-color");
      msg.innerHTML = "Please enter a value";
    }
    if (evt.target.dataset.name === "Email" && evt.target.value !== "" && !evt.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      evt.target.classList.add("input-focus-color");
      msg.innerHTML = "Please enter valid email address";
    }
    if (evt.target.dataset.name === "Phone" && evt.target.value !== "" && !evt.target.value.match(/^\d{10}$/)) {
      evt.target.classList.add("input-focus-color");
      msg.innerHTML = "Please enter valid phone number";
    }
    if ((evt.target.dataset.name === "FirstName" || evt.target.dataset.name === "LastName") && evt.target.value !== "" && !evt.target.value.match(/^[A-Za-z]+$/)) {
      evt.target.classList.add("input-focus-color");
      msg.innerHTML = "Invalid name";
    }
  };
  const validatePhoneNumber = (event) => {
    var keycode = event.which;
    if (!(event.shiftKey === false && (keycode === 46 || keycode === 8 || keycode === 37 || keycode === 39 || (keycode >= 48 && keycode <= 57)))) {
      event.preventDefault();
    }
  };
  const changeCurrentPassword = (evt) => {
    const msg = document.querySelector(`[data-id="${evt.target.id}"]`);
    if (evt.target.value === "" || evt.target.value === null) {
      evt.target.classList.add("input-focus-color");
      msg.innerHTML = "Please enter a value";
    } else {
      evt.target.classList.remove("input-focus-color");
      msg.innerHTML = "";
      if (evt.target.name === "password") {
        if (evt.target.value !== userData.Password__c) {
          evt.target.classList.add("input-focus-color");
          msg.innerHTML = "Password doesn't match";
        }
      }
    }
  };
  const updateDataToServer = (dataToBeSend, password) => {
    setIsPassword(password != null ? true : false);
    const raw = {
      conId: dataToBeSend.Id,
      conLastName: dataToBeSend.LastName,
      conFirstName: dataToBeSend.FirstName,
      conMailingStreet: dataToBeSend.MailingStreet == null ? "" : dataToBeSend.MailingStreet,
      conMailingCity: dataToBeSend.MailingCity == null ? "" : dataToBeSend.MailingCity,
      conMailingState: dataToBeSend.MailingState == null ? "" : dataToBeSend.MailingState,
      conMailingPostalCode: dataToBeSend.MailingPostalCode == null ? "" : dataToBeSend.MailingPostalCode,
      conMailingCountry: dataToBeSend.MailingCountry == null ? "" : dataToBeSend.MailingCountry,
      conPhone: dataToBeSend.Phone == null ? "" : dataToBeSend.Phone,
      conEmail: dataToBeSend.Email,
      conDescription: dataToBeSend.Description == null ? "" : dataToBeSend.Description,
      conPassword: password == null ? dataToBeSend.Password__c : password,
    };
    dispatch(editProfileAction(raw));
  };
  const changePassword = () => {
    const currPass = document.getElementById("currentPassword");
    const currPassMsg = document.querySelector(`[data-id="currentPassword"]`);
    const newPass = document.getElementById("newPassword");
    const reNewPass = document.getElementById("renewPassword");
    const newPassMsg = document.querySelector(`[data-id="newPassword"]`);
    const reNewPassMsg = document.querySelector(`[data-id="renewPassword"]`);
    let valid = true;
    if (currPass.value === "" || currPass.value == null) {
      valid = false;
      currPass.classList.add("input-focus-color");
      currPassMsg.innerHTML = "Please enter a value";
    } else if (currPass.value !== "" && currPass.value !== userData.Password__c) {
      valid = false;
      currPass.classList.add("input-focus-color");
      currPassMsg.innerHTML = "Password doesn't match";
    }
    if (newPass.value === "" || newPass.value == null) {
      valid = false;
      newPass.classList.add("input-focus-color");
      newPassMsg.innerHTML = "Please enter a value";
    } else if (newPass.value !== "" && !newPass.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)) {
      valid = false;
      newPass.classList.add("input-focus-color");
      newPassMsg.innerHTML = "Please enter a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter";
    }
    if (reNewPass.value === "" || reNewPass.value == null) {
      valid = false;
      reNewPass.classList.add("input-focus-color");
      reNewPassMsg.innerHTML = "Please enter a value";
    } else if (reNewPass.value !== "" && reNewPass.value !== newPass.value) {
      valid = false;
      reNewPass.classList.add("input-focus-color");
      reNewPassMsg.innerHTML = "Password doesn't match";
    }

    if (valid) {
          updateDataToServer(userData, reNewPass.value);
    }
  };
  const validFieldsOnSubmit = () => {
    let isValid = true;
    const fname = document.querySelector('[data-id="con-fname"]');
    const fnameMSG = document.querySelector('[data-id="con-fnameMSG"]');
    const lname = document.querySelector('[data-id="con-lname"]');
    const lnameMSG = document.querySelector('[data-id="con-lnameMSG"]');
    const email = document.querySelector('[data-id="con-email"]');
    const emailMSG = document.querySelector('[data-id="con-emailMSG"]');
    const phone = document.querySelector('[data-id="con-phone"]');
    const phoneMSG = document.querySelector('[data-id="con-phoneMSG"]');
    var regName = /^[A-Za-z]+$/;
    if (fname.value == null || fname.value === "") {
      fname.classList.add("input-focus-color");
      fnameMSG.innerHTML = "Please enter a value";
      isValid = false;
    } else if (!regName.test(fname.value)) {
      fname.classList.add("input-focus-color");
      fnameMSG.innerHTML = "Invalid name";
      isValid = false;
    }
    if (lname.value == null || lname.value === "") {
      lname.classList.add("input-focus-color");
      lnameMSG.innerHTML = "Please enter a value";
      isValid = false;
    } else if (!regName.test(lname.value)) {
      lname.classList.add("input-focus-color");
      lnameMSG.innerHTML = "Invalid name";
      isValid = false;
    }
    if (email.value == null || email.value === "") {
      email.classList.add("input-focus-color");
      emailMSG.innerHTML = "Please enter a value";
      isValid = false;
    } else if (!email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      email.classList.add("input-focus-color");
      emailMSG.innerHTML = "Please enter valid email address";
      isValid = false;
    }
    if (phone.value == null || phone.value === "") {
      phone.classList.add("input-focus-color");
      phoneMSG.innerHTML = "Please enter a value";
      isValid = false;
    } else if (!phone.value.match(/^\d{10}$/)) {
      phone.classList.add("input-focus-color");
      phoneMSG.innerHTML = "Please enter valid phone number";
      isValid = false;
    }
    return isValid;
  };
  const updateUserData = () => {
    const userDetail = {...loginUserContactObjData};
    console.log('userDetail',userDetail);
    console.log('userData', userData);
    if (
      userData.FirstName !== userDetail.FirstName ||
      userData.LastName !== userDetail.LastName ||
      userData.Email !== userDetail.Email ||
      userData.Phone !== userDetail.Phone ||
      userData.MailingStreet !== userDetail.MailingStreet ||
      userData.MailingCity !== userDetail.MailingCity ||
      userData.MailingPostalCode !== userDetail.MailingPostalCode ||
      userData.MailingCountry !== userDetail.MailingCountry ||
      userData.MailingState !== userDetail.MailingState ||
      userData.Description !== userDetail.Description
    ) {
      if (validFieldsOnSubmit()) {
        updateDataToServer(userData, null);
      }
    } else {
      toast.info("Nothing to change", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <>
      <AdminHeader />
      <ToastContainer />
      <div style={{ marginTop: "5rem", marginLeft: "1rem", marginRight: "1rem" }}>
        <div className="pagetitle">
          <h1>Profile</h1>
        </div>
        {/* <!-- End Page Title --> */}
        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <div id="profilePageImage"></div>
                  {/* <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle"/> */}

                  <h2>{userData?.FirstName + " " + userData?.LastName}</h2>
                  {/* <h3>Web Designer</h3> */}
                  <div className="social-links mt-2">
                    <a href="# " onClick={(e) => e.preventDefault()} className="twitter">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="# " onClick={(e) => e.preventDefault()} className="facebook">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="# " onClick={(e) => e.preventDefault()} className="instagram">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="# " onClick={(e) => e.preventDefault()} className="linkedin">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  {/* <!-- Bordered Tabs --> */}
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">
                        Overview
                      </button>
                    </li>

                    <li className="nav-item">
                      <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">
                        Settings
                      </button>
                    </li>

                    <li className="nav-item">
                      <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">
                        Change Password
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div className="tab-pane fade show active profile-overview" id="profile-overview">
                      <h5 className="card-title">Description</h5>

                      <textarea name="message" id="message" cols="30" rows="8" required data-id="con-desc" data-name="Description" className="col-12 d-flex justify-content-between d-none form-control py-2 input-text-underline" defaultValue={userData?.Description} onChange={handleChange}></textarea>
                      <div className="small fst-italic" data-id="con-desc">
                        {userData?.Description}
                        <i className="bi bi-pen pen-icon" id="con-desc" onClick={toggleEditMode}></i>
                      </div>

                      <h5 className="card-title">Profile Details</h5>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">
                          <span style={{ color: "red" }}>*</span>First Name
                        </div>
                        <div style={{ width: "75%" }}>
                          <input maxLength={20} type="text" className="col-lg-9 col-md-8 d-none form-control input-text-underline" data-id="con-fname" data-name="FirstName" defaultValue={userData?.FirstName} onChange={handleChange} onBlur={overviewHandleBlur} />
                          <div className="col-12 d-flex justify-content-between" data-id="con-fname">
                            {userData?.FirstName}
                            <i className="bi bi-pen pen-icon" id="con-fname" onClick={toggleEditMode}></i>
                          </div>
                          <span data-id="con-fnameMSG" style={{ color: "red" }}></span>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          <span style={{ color: "red" }}>*</span>Last Name
                        </div>
                        <div style={{ width: "75%" }}>
                          <input maxLength={20} type="text" className="col-lg-9 col-md-8 d-none form-control input-text-underline" data-id="con-lname" data-name="LastName" defaultValue={userData?.LastName} onChange={handleChange} onBlur={overviewHandleBlur} />
                          <div className="col-12 d-flex justify-content-between" data-id="con-lname">
                            {userData?.LastName}
                            <i className="bi bi-pen pen-icon" id="con-lname" onClick={toggleEditMode}></i>
                          </div>
                          <span data-id="con-lnameMSG" style={{ color: "red" }}></span>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          <span style={{ color: "red" }}>*</span>Email
                        </div>
                        <div style={{ width: "75%" }}>
                          <input type="text" className="col-lg-9 col-md-8 d-none form-control input-text-underline" data-id="con-email" data-name="Email" defaultValue={userData?.Email} onChange={handleChange} onBlur={overviewHandleBlur} />
                          <div className="col-12 d-flex justify-content-between" data-id="con-email">
                            {userData?.Email}
                            <i className="bi bi-pen pen-icon" id="con-email" onClick={toggleEditMode}></i>
                          </div>
                          <span data-id="con-emailMSG" style={{ color: "red" }}></span>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          <span style={{ color: "red" }}>*</span>Phone
                        </div>
                        <div style={{ width: "75%" }}>
                          <input maxLength={10} minLength={10} type="text" className="col-lg-9 col-md-8 d-none form-control input-text-underline" data-id="con-phone" data-name="Phone" defaultValue={userData?.Phone} onChange={handleChange} onBlur={overviewHandleBlur} onKeyDown={validatePhoneNumber} />
                          <div className="col-12 d-flex justify-content-between" data-id="con-phone">
                            {userData?.Phone}
                            <i className="bi bi-pen pen-icon" id="con-phone" onClick={toggleEditMode}></i>
                          </div>
                          <span data-id="con-phoneMSG" style={{ color: "red" }}></span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Street</div>
                        <div style={{ width: "75%" }}>
                          <input maxLength={20} type="text" className="col-lg-9 col-md-8 d-none form-control input-text-underline" data-id="con-street" data-name="MailingStreet" defaultValue={userData?.MailingStreet} onChange={handleChange} />
                          <div className="col-12 d-flex justify-content-between" data-id="con-street">
                            {userData?.MailingStreet}
                            <i className="bi bi-pen pen-icon" id="con-street" onClick={toggleEditMode}></i>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">City</div>
                        <div style={{ width: "75%" }}>
                          <input maxLength={20} type="text" className="col-lg-9 col-md-8 d-none form-control input-text-underline" data-id="con-city" data-name="MailingCity" defaultValue={userData?.MailingCity} onChange={handleChange} />
                          <div className="col-12 d-flex justify-content-between" data-id="con-city">
                            {userData?.MailingCity}
                            <i className="bi bi-pen pen-icon" id="con-city" onClick={toggleEditMode}></i>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">State</div>
                        <div style={{ width: "75%" }}>
                          <input maxLength={20} type="text" className="col-lg-9 col-md-8 d-none form-control input-text-underline" data-id="con-state" data-name="MailingState" defaultValue={userData?.MailingState} onChange={handleChange} />
                          <div className="col-12 d-flex justify-content-between" data-id="con-state">
                            {userData?.MailingState}
                            <i className="bi bi-pen pen-icon" id="con-state" onClick={toggleEditMode}></i>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Postal Code</div>
                        <div style={{ width: "75%" }}>
                          <input maxLength={20} type="text" className="col-lg-9 col-md-8 d-none form-control input-text-underline" data-id="con-postal" data-name="MailingPostalCode" defaultValue={userData?.MailingPostalCode} onChange={handleChange} />
                          <div className="col-12 d-flex justify-content-between" data-id="con-postal">
                            {userData?.MailingPostalCode}
                            <i className="bi bi-pen pen-icon" id="con-postal" onClick={toggleEditMode}></i>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Country</div>
                        <div style={{ width: "75%" }}>
                          <input maxLength={20} type="text" className="col-lg-9 col-md-8 d-none form-control input-text-underline" data-id="con-country" data-name="MailingCountry" defaultValue={userData?.MailingCountry} onChange={handleChange} />
                          <div className="col-12 d-flex justify-content-between" data-id="con-country">
                            {userData?.MailingCountry}
                            <i className="bi bi-pen pen-icon" id="con-country" onClick={toggleEditMode}></i>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <button className="btn btn-primary" onClick={updateUserData}>
                          Save Changes
                        </button>
                      </div>
                      {/* <div className="row">
                        <div className="col-lg-3 col-md-4 label">Address</div>
                        <div className="col-lg-9 col-md-8">A108 Adam Street, New York, NY 535022</div>
                      </div> */}
                    </div>

                    <div className="tab-pane fade pt-3" id="profile-settings">
                      {/* <!-- Settings Form --> */}
                      <form>
                        <div className="row mb-3">
                          <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">
                            Email Notifications
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="changesMade" defaultChecked />
                              <label className="form-check-label" htmlFor="changesMade">
                                Changes made to your account
                              </label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="newProducts" defaultChecked />
                              <label className="form-check-label" htmlFor="newProducts">
                                Information on new products and services
                              </label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="proOffers" />
                              <label className="form-check-label" htmlFor="proOffers">
                                Marketing and promo offers
                              </label>
                            </div>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" id="securityNotify" defaultChecked disabled />
                              <label className="form-check-label" htmlFor="securityNotify">
                                Security alerts
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div className="text-center">
                        <button className="btn btn-primary">Save Changes</button>
                      </div>
                      {/* <!-- End settings Form --> */}
                    </div>

                    <div className="tab-pane fade pt-3" id="profile-change-password">
                      {/* <!-- Change Password Form --> */}
                      <form>
                        <div className="row mb-3">
                          <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">
                            Current Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input name="password" type="password" className="form-control" id="currentPassword" onChange={changeCurrentPassword} onBlur={handleBlur} />
                            <span style={{ color: "red" }} data-id="currentPassword"></span>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">
                            New Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input name="newpassword" type="password" className="form-control" id="newPassword" onChange={changeCurrentPassword} onBlur={handleBlur} />
                            <span style={{ color: "red" }} data-id="newPassword"></span>
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">
                            Re-enter New Password
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input name="renewpassword" type="password" className="form-control" id="renewPassword" onChange={changeCurrentPassword} onBlur={handleBlur} />
                            <span style={{ color: "red" }} data-id="renewPassword"></span>
                          </div>
                        </div>
                      </form>
                      <div className="text-center">
                        <button className="btn btn-primary" onClick={changePassword}>
                          Change Password
                        </button>
                      </div>
                      {/* <!-- End Change Password Form --> */}
                    </div>
                  </div>
                  {/* <!-- End Bordered Tabs --> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="loading d-none" id="spinner">
          Loading&#8230;
        </div>
      </div>
      <Footer />
    </>
  );
};
