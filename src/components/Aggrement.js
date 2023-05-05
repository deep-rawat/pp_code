import React, {useEffect, useState } from "react";
import "./Aggrement.css";
import { AdminHeader } from "./AdminHeader";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { createAggrement, resetAggrementResponse } from "../store/actions/propertyAction";
export const Aggrement = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState({});
  const [submitbtn, setSubmitbtn] = useState(true);
  const aggrementResponse = useSelector((state) => state?.aggrementReducer);
  
    useEffect(()=>{
      window.scrollTo(0, 0);
     },[]);
  
     useEffect(() => {
       if(aggrementResponse?.data){
        toast.success('Aggrement Submitted Successfully', {autoClose: 3000,});
        dispatch(resetAggrementResponse());
       }
       showSpinner(aggrementResponse?.loading);
     }, [aggrementResponse]);
     

     const showSpinner = (show) => {
      const spinner = document.getElementById("spinner");
      show ? spinner.classList.remove("d-none") : spinner.classList.add("d-none");
    };
     function validate() {
    
      var title = document.getElementsByName('ownerfName')[0]
      if (title.value === '' || title.value.includes(" ") ) {
        toast.error('Please Enter Owner First Name');
        title.scrollIntoView();
        title.focus();
        return false;
      }    
       title = document.getElementsByName('ownerlName')[0]
      if (title.value === '' || title.value.includes(" ")) {
        toast.error('Please Enter Owner Last Name');
        title.scrollIntoView();
        title.focus();
        return false;
      }    
      title = document.getElementsByName('ownermobile')[0]
      if (!title.value.match(/^\d{10}$/)) {
        toast.error('Enter Valid Mobile Number');
        title.scrollIntoView();
        title.focus();
        return false;
      }    
      title = document.getElementsByName('ownerEmail')[0]
      if (!title.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ||  title.value.length === 0) {
        toast.error('Enter Valid Email Address'); 
        title.focus();
        return false;
      }    
      title = document.getElementsByName('renterfName')[0]
      if (title.value === '' || title.value.includes(" ")) {
        toast.error('Please Enter Renter First Name');
        title.scrollIntoView();
        title.focus();
        return false;
      }    
      title = document.getElementsByName('renterlName')[0]
      if (title.value === '' || title.value.includes(" ")) {
        toast.error('Please Enter Renter Last Name');
        title.scrollIntoView();
        title.focus();
        return false;
      }    
      title = document.getElementsByName('rentermobile')[0]
      if (!title.value.match(/^\d{10}$/)) {
        toast.error('Enter Valid Mobile Number');
        title.scrollIntoView();
        title.focus();
        return false;
      }    
      
      title = document.getElementsByName('renterEmail')[0]
      if (!title.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) || title.value.length === 0) {
        toast.error('Enter Valid Email Address');
        title.scrollIntoView();
        title.focus();
        return false;
      }    
      return true;
    }

  const submitform = () => {
    if(validate()){
      const raw = {
        aggFormName             : "AGGREMENT FORM",
        kam                     : "dev",
        ownerFName              : formFields.hasOwnProperty('ownerfName') ? formFields.ownerfName : '',
        ownerMidName            : formFields.hasOwnProperty('ownermidName') ? formFields.ownermidName : '',
        ownerLName              : formFields.hasOwnProperty('ownerlName') ? formFields.ownerlName : '',      
        ownerMobile             : formFields.hasOwnProperty('ownermobile') ? formFields.ownermobile : '',      
        ownerEmail              : formFields.hasOwnProperty('ownerEmail') ? formFields.ownerEmail : '',
        ownerAddress            : formFields.hasOwnProperty('ownerAddress') ? formFields.ownerAddress : '',
        ownerCity               : formFields.hasOwnProperty('ownerCity') ? formFields.ownerCity : '',
        ownerState              : formFields.hasOwnProperty('ownerState') ? formFields.ownerState : '',
        renterFName             : formFields.hasOwnProperty('renterfName') ? formFields.renterfName : '',
        renterMidName           : formFields.hasOwnProperty('rentermidName') ? formFields.rentermidName : '',
        renterLName             : formFields.hasOwnProperty('renterlName') ? formFields.renterlName : '',
        renterEmail             : formFields.hasOwnProperty('renterEmail') ? formFields.renterEmail : '',
        renterMobile            : formFields.hasOwnProperty('rentermobile') ? formFields.rentermobile : '',
        renterAddress           : formFields.hasOwnProperty('renterAddress') ? formFields.renterAddress : '',
        renterCity              : formFields.hasOwnProperty('renterCity') ? formFields.renterCity : '',
        renterState             : formFields.hasOwnProperty('renterState') ? formFields.renterState : '',
        rentStartDate           : formFields.hasOwnProperty('rentstartdate') ? formFields.rentstartdate : '',
        rentEndDate             : formFields.hasOwnProperty('rentenddate') ? formFields.rentenddate : '',
        monthlyRentAmount       : formFields.hasOwnProperty('monthrentamount') ? formFields.monthrentamount : '',
        paymentCollectorFName   : formFields.hasOwnProperty('paymentcollectorfname') ? formFields.paymentcollectorfname : '',
        paymentCollectorLName   : formFields.hasOwnProperty('paymentcollectorlname') ? formFields.paymentcollectorlname : '',
        paymentDueDate          : formFields.hasOwnProperty('paymentduedate') ? formFields.paymentduedate : '',
        paymentMethod           : formFields.hasOwnProperty('paymentmethod') ? formFields.paymentmethod : '',
        intialPayment           : formFields.hasOwnProperty('intialpayment') ? formFields.intialpayment : '',
        securityDeposite        : formFields.hasOwnProperty('securitydeposite') ? formFields.securitydeposite : '',
      };
      dispatch(createAggrement(raw));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };
  const submit = (e) => {
    const check = e.target.checked;
    if (check) {
      setSubmitbtn(false);
    } else {
      setSubmitbtn(true);
    }
  };

  return (
    <>
      <AdminHeader active="aggrement" />
      <div className="loading d-none" id="spinner">
          Loading&#8230;
        </div>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
      <div className="form-width" id="aggrementFormDiv">
        <div className="aggrementcontainer ">
          <div className="formHeader">Rent Aggrement Form</div>
          <div className="formItem">
            <div className="lessorandlesse">Owner Information</div>
            <ul>
              <li>
                <span className="itemlabel"> First Name <span style={{color:'red'}}> *</span>&nbsp; </span>
                <div className="iteminput">
                  <input placeholder="John" value={formFields.ownerfName} onChange={handleChange} name="ownerfName" id="aggOwnerName" ></input>
                </div>
              </li>
              <li>
                <span className="itemlabel"> Middle Name &nbsp; </span>
                <div className="iteminput">
                  <input placeholder="...." value={formFields.ownermidName} onChange={handleChange} name="ownermidName" ></input>
                </div>
              </li>
              <li>
                <span className="itemlabel"> Last Name <span style={{color:'red'}}> *</span>&nbsp; </span>
                <div className="iteminput">
                  <input placeholder="Kelin" value={formFields.ownerlName} onChange={handleChange} name="ownerlName" ></input>
                </div>
              </li>
              <li>
                <span className="itemlabel"> Mobile <span style={{color:'red'}}> *</span>&nbsp; </span>
                <div className="iteminput">
                  <input placeholder="98xxxxxxxx" value={formFields.ownermobile} onChange={handleChange} name="ownermobile" ></input>
                </div>
              </li>
              <li>
                <span className="itemlabel"> Email <span style={{color:'red'}}> *</span>&nbsp; </span>
                <div className="iteminput">
                  <input placeholder="abc@gmail.com" type={"email"} value={formFields.ownerEmail} onChange={handleChange} name="ownerEmail" ></input>
                </div>
              </li>
              <li>
                <span className="itemlabel"> Address &nbsp; </span>
                <div className="iteminput">
                  <input value={formFields.ownerAddress} onChange={handleChange} name="ownerAddress"></input>
                </div>
              </li>
              <li>
                <span className="itemlabel"> City &nbsp; </span>
                <div className="iteminput">
                  <input value={formFields.ownerCity} onChange={handleChange} name="ownerCity"></input>
                </div>
              </li>
              <li>
                <span className="itemlabel"> State &nbsp; </span>
                <div className="iteminput">
                  <input value={formFields.ownerState} onChange={handleChange} name="ownerState" ></input>
                </div>
              </li>
            </ul>
          </div>
          <div className="formItem">
            <div className="lessorandlesse">Renter Information</div>
            <ul>
              <li>
                <span className="itemlabel"> First Name <span style={{color:'red'}}> *</span>&nbsp; </span>
                <div className="iteminput">
                  <input placeholder="John" value={formFields.renterfName} onChange={handleChange} name="renterfName" ></input>
                </div>
              </li>
              <li>
                <span className="itemlabel"> Middle Name &nbsp; </span>
                <div className="iteminput">
                  <input placeholder="...." value={formFields.rentermidName} onChange={handleChange} name="rentermidName" ></input>
                </div>
              </li>
              <li>
                <span className="itemlabel"> Last Name <span style={{color:'red'}}> *</span>&nbsp; </span>
                <div className="iteminput">
                  <input placeholder="Kelin" value={formFields.renterlName} onChange={handleChange} name="renterlName" ></input>
                </div>
              </li>
              <li>
                <span className="itemlabel"> Mobile <span style={{color:'red'}}> *</span>&nbsp; </span>
                <div className="iteminput">
                  <input placeholder="98xxxxxxxx" value={formFields.rentermobile} onChange={handleChange} name="rentermobile" ></input>
                </div>
              </li>
              <li>
                <span className="itemlabel"> Email <span style={{color:'red'}}> *</span>&nbsp; </span>
                <div className="iteminput">
                  <input placeholder="abc@gmail.com" type={"email"} value={formFields.renterEmail} onChange={handleChange} name="renterEmail" ></input>
                </div>
              </li>
              <li>
                <span className="itemlabel"> Address &nbsp; </span>
                <div className="iteminput">
                  <input value={formFields.renterAddress} onChange={handleChange} name="renterAddress" ></input> 
                </div>
              </li>
              <li>
                <span className="itemlabel"> City &nbsp; </span>
                <div className="iteminput">
                  <input value={formFields.renterCity} onChange={handleChange} name="renterCity" ></input>
                </div>
              </li>
              <li>
                <span className="itemlabel"> State &nbsp; </span>
                <div className="iteminput">
                  <input value={formFields.renterState} onChange={handleChange} name="renterState" ></input>
                </div>
              </li>
            </ul>
          </div>
          <div className="RentalInfo">
            <div className="lessorandlesse">Rental Information</div>
            <div>
              <ul>
                <li>
                  <span>Rent Start Date</span>
                  <div>
                    <input type={"date"} value={formFields.rentstartdate} onChange={handleChange} name="rentstartdate" ></input>
                  </div>
                </li>
                <li>
                  <span>Rent End Date</span>
                  <div>
                    <input type={"date"} value={formFields.rentenddate} onChange={handleChange} name="rentenddate" ></input>
                  </div>
                </li>
                <li>
                  <span>Monthly Rental Amount</span>
                  <div>
                    <input type="number" placeholder="10,000" value={formFields.monthrentamount} onChange={handleChange} name="monthrentamount" ></input>
                  </div>
                </li>
                <li>
                  <span>Payment Will be Collected by</span>
                  <div>
                    <input style={{ float: "left", width: "7rem" }} placeholder={"FirstName"} value={formFields.paymentcollectorfname} onChange={handleChange} name="paymentcollectorfname" ></input>{" "}
                    &nbsp;&nbsp;
                    <input placeholder="LastName" style={{ width: "7rem" }} value={formFields.paymentcollectorlname} onChange={handleChange} name="paymentcollectorlname" ></input>
                  </div>
                </li>
                <li>
                  <span>Payment Due Date</span>
                  <div>
                    <input type={"date"} value={formFields.paymentduedate} onChange={handleChange} name="paymentduedate" ></input>
                  </div>
                </li>
                <li>
                  <span>Payment Method</span>
                  <div>
                    <input placeholder="Cash" value={formFields.paymentmethod} onChange={handleChange} name="paymentmethod" ></input>
                  </div>
                </li>
                <li>
                  <span>Initial Payment</span>
                  <div>
                    <input type="number" placeholder="10,000" value={formFields.intialpayment} onChange={handleChange} name="intialpayment"></input>
                  </div>
                </li>
                <li>
                  <span>Security Deposite</span>
                  <div>
                    <input type="number" placeholder="10,000" value={formFields.securitydeposite} onChange={handleChange} name="securitydeposite"></input>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* <div style={{ padding: "4vh 2vh 0px 2vh" }}>
            <div className="lessorandlesse">Equipment Information</div>
            <div className="EquipInfo">
              <table>
                <tr>
                  <td>
                    <div> &nbsp;</div>
                    <span>Equipment Description</span>
                  </td>
                  <td>
                    <div> &nbsp;</div>
                    <span>Numbers of Item</span>
                  </td>
                  <td>
                    <div> &nbsp;</div>
                    <span>Serial No</span>
                  </td>
                </tr>

                <tr>
                  <td>
                    <input placeholder="Equipment"></input>
                  </td>
                  <td>
                    <input placeholder="Numbers of Item"></input>
                  </td>
                  <td>
                    <input placeholder="Serial No."></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input placeholder="Equipment"></input>
                  </td>
                  <td>
                    <input placeholder="Numbers of Item"></input>
                  </td>
                  <td>
                    <input placeholder="Serial No."></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input placeholder="Equipment"></input>
                  </td>
                  <td>
                    <input placeholder="Numbers of Item"></input>
                  </td>
                  <td>
                    <input placeholder="Serial No."></input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div> &nbsp;</div>
                  </td>
                  <td>
                    <div> &nbsp;</div>
                  </td>
                  <td>
                    <div> &nbsp;</div>
                  </td>
                </tr>
              </table>
            </div>
          </div> */}
          <div style={{ padding: "4vh 2vh 0px 2vh" }}>
            <div className="lessorandlesse">Terms And Conditions</div>
            <div className="termcondition">
              <div style={{ width: "5%" }}>
                <input type={"checkbox"} onChange={submit} style={{height:'1.7vh'}} ></input>
              </div>
              <div style={{ width: "90%" }}>
                <ol>
                  <li>
                    <h6>Parties</h6>
                    <span>
                      This Equilent Rental Information has been signed between{" "}
                      {"FirstName"} {"LastName"} (Lessor here in after ) and
                      (Lesse here in after ) {"FirstName"} {"LastName"} on{" "}
                      {"Date"} The partise have aggred to lease the above
                      mentoined Equipment under the followning term and
                      conditions
                    </span>
                  </li>
                  <li>
                    <h6>Term of Aggrement</h6>
                    <span>
                      The Aggerment enters into force on {"Total Price"} and
                      will remain in effect for {"Duration"} At the End of the
                      Rental period . The Aggrement will Automatically terminate
                      without any warning or notice but parties may decide to
                      extend the period in writing or they may sign a new
                      contract with new term and conditions.
                    </span>
                  </li>
                  <li>
                    <h6>Security Deposite</h6>
                    <span>
                      The Lesse agrees to pay a Security of ${" "}
                      {"Security Deposite"} . This should be refund upon
                      returning the Equipment or termination of this Aggrement.
                      The Security Deposite will cover for any Damage to
                      Equipment
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div className="submitForm">
            <button
              type="button"
              className="btn btn-outline-dark"
              disabled={submitbtn}
              onClick={submitform}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
