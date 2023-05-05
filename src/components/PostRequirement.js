import React, { useEffect, useState } from "react";
import "./Aggrement.css";
import AdminHeader from "./AdminHeader";
import { Footer } from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { resetPropertyRequirementResponse, postPropertyRequirement } from "../store/actions/propertyAction";

export const PostRequirement = () => {
   const dispatch = useDispatch();
  const [postRequirment, setPostRequirment] = useState({});
  const [sendAmenities, setSendAmenities] = useState([]);
  const [amenities, setAmenities] = useState([]);
  var selectedAmenities = [];

  const propertyWrapList = useSelector((state) => state?.propertyData?.data?.propertyWrapList);
  const postPropertyRequirementResponse = useSelector((state) => state?.postPropertyRequirementReducer);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
   const amenitiesData = new Set();
   propertyWrapList?.forEach((property) => {
     property?.propertyObj?.PP_Amenities__c?.split(";")?.forEach((amenity) => {
       amenitiesData.add(amenity);
     });
   });
   setAmenities(Array.from(amenitiesData));
 }, [propertyWrapList]);

 useEffect(() => {
   console.log(postPropertyRequirementResponse)
   if(postPropertyRequirementResponse?.data){
     toast.success("Property Uploaded Successfully", { autoClose: 3000 });
     dispatch(resetPropertyRequirementResponse());
   }
   showSpinner(postPropertyRequirementResponse?.loading);
 }, [postPropertyRequirementResponse]);

 const showSpinner = (show) => {
   const spinner = document.getElementById("spinner");
   show ? spinner.classList.remove("d-none") : spinner.classList.add("d-none");
 };


  function validate() {
    // console.log(postRequirment);
    // console.log(selectedAmenities,selectedAmenities.length);
    // console.log(sendAmenities);
    var title = document.getElementsByName("posted_requirmenter_name")[0];
    if (title.value === "" || title.value.includes(" ")) {
      // toast.error('Name is missing');
      toast.error("Please Enter Valid Name");
      window.scrollTo(0, 0);
      title.focus();
      return false;
    }
    var inputEmail = document.getElementsByName("posted_requirmenter_email");
    if (!inputEmail[0].value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      toast.error("Enter Valid Email address");
      inputEmail[0].focus();
      inputEmail.scrollIntoView();
      return false;
    }
    var contactNo = document.getElementsByName("posted_requirmenter_contactno")[0];
    if (!contactNo.value.match(/^\d{10}$/)) {
      toast.error("Enter Valid Contact Number");
      contactNo.focus();
      contactNo.scrollIntoView();
      return false;
    }
    var min = parseInt(document.getElementsByName("posted_requirmenter_minprice")[0].value);
    var max = parseInt(document.getElementsByName("posted_requirmenter_maxprice")[0].value);
    if (min === max && min !== 0 && max !== 0) {
      window.scrollTo(0, 0);
      toast.error("Minimum Price Cannot Equal to Maximum Price");
      return false;
    }
    if (min > max && min !== 0 && max !== 0) {
      window.scrollTo(0, 0);
      toast.error("Minimum Price Cannot Greater than Maximum Price");
      return false;
    }
    title = document.getElementsByName("posted_requirmenter_minprice")[0];
    if (!/^\d+$/.test(title.value) && title.value.length > 0) {
      toast.error("Enter Valid Minimum Price");
      title.focus();
      title.scrollIntoView();
      return false;
    }
    title = document.getElementsByName("posted_requirmenter_maxprice")[0];
    if (!/^\d+$/.test(title.value) && title.value.length > 0) {
      toast.error("Enter Valid Maximum Price");
      title.focus();
      title.scrollIntoView();
      return false;
    }
    title = document.getElementsByName("posted_requirmenter_exceptedarea")[0];
    if (!/^\d+$/.test(title.value) && title.value.length > 0) {
      toast.error("Enter Valid Area");
      title.focus();
      title.scrollIntoView();
      return false;
    }
    return true;
  }

  const submitRequirment = () => {
    var valid = validate();
    if (valid) {
      const raw = {
         propertyRequirementPost: "POST REQUIRMENT FORM",
         senderName: postRequirment.hasOwnProperty("posted_requirmenter_name") ? postRequirment.posted_requirmenter_name : "",
         senderEmail: postRequirment.hasOwnProperty("posted_requirmenter_email") ? postRequirment.posted_requirmenter_email : "",
         senderContact: postRequirment.hasOwnProperty("posted_requirmenter_contactno") ? postRequirment.posted_requirmenter_contactno : "",
         senderExpected_landArea: postRequirment.hasOwnProperty("posted_requirmenter_exceptedarea") ? postRequirment.posted_requirmenter_exceptedarea : "",
         senderStatus: postRequirment.hasOwnProperty("posted_requirmenter_status") ? postRequirment.posted_requirmenter_status : "",
         senderCategory: postRequirment.hasOwnProperty("posted_requirmenter_category") ? postRequirment.posted_requirmenter_category : "",
         senderMinPrice: postRequirment.hasOwnProperty("posted_requirmenter_minprice") ? postRequirment.posted_requirmenter_minprice : "",
         senderMaxPrice: postRequirment.hasOwnProperty("posted_requirmenter_maxprice") ? postRequirment.posted_requirmenter_maxprice : "",
         senderDescription: postRequirment.hasOwnProperty("posted_requirmenter_description") ? postRequirment.posted_requirmenter_description : "",
         amenities: sendAmenities,
       };
       dispatch(postPropertyRequirement(raw));
    }
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      selectedAmenities = sendAmenities;
      selectedAmenities.push(e.target.name);
      setSendAmenities(selectedAmenities);
    } else {
      selectedAmenities = sendAmenities;
      selectedAmenities.splice(
        selectedAmenities.findIndex((element) => element === e.target.name),
        1
      );
      setSendAmenities(selectedAmenities);
    }
  };

  return (
    <div className="postReq-mainDiv" id="postReqmainDiv" style={{ background: "white" }}>
      {/* // ----------------------------POST REQUIRMENT COMPONENT OPEN---------------------------  */}
      <div>
        <AdminHeader active="postrequirment" />
        <div className="loading d-none" id="spinner">
          Loading&#8230;
        </div>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" style={{ top: "4rem" }} />
        <div className="postRequirment-component-mainDiv">
          <div style={{ width: "100%", marginTop: "10vh", marginBottom: "4vh" }} className="text-center">
            <h2>Post Requirement</h2>
          </div>
          <div className="row with-forms" style={{ width: "90%", marginLeft: "5%", marginRight: "5%" }}>
            <div className="form-group col-md-4 col-sm-6 col-xs-12">
              <div>
                <label>
                  &nbsp; Name<span style={{ color: "red" }}> *</span>
                </label>
                <br />
                <input
                  placeholder="Name"
                  name="posted_requirmenter_name"
                  id="propsName"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setPostRequirment({ ...postRequirment, [name]: value });
                  }}
                />
              </div>
            </div>

            <div className="form-group col-md-4 col-sm-6 col-xs-12">
              <div>
                <label>
                  &nbsp; Email<span style={{ color: "red" }}> *</span>
                </label>
                <br />
                <input
                  id="postReqEmailInput"
                  type="email"
                  placeholder="Email"
                  name="posted_requirmenter_email"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setPostRequirment({ ...postRequirment, [name]: value });
                  }}
                />
              </div>
            </div>

            <div className="form-group col-md-4 col-sm-6 col-xs-12">
              <div>
                <label>
                  &nbsp; Contact No.<span style={{ color: "red" }}> *</span>
                </label>
                <br />
                <input
                  placeholder="Contact No."
                  type="number"
                  name="posted_requirmenter_contactno"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setPostRequirment({ ...postRequirment, [name]: value });
                  }}
                />
              </div>
            </div>

            <div className="form-group col-md-4 col-sm-6 col-xs-12">
              <div>
                <label>&nbsp; Category</label>
                <br />
                <select
                  name="posted_requirmenter_category"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setPostRequirment({ ...postRequirment, [name]: value });
                  }}>
                  <option>--No Choice--</option>
                  <option>Quadplex</option>
                  <option>Duplex</option>
                  <option>Triplex</option>
                  <option>Penthouse</option>
                  <option>Garden Appartment</option>
                  <option>F1 Appartment</option>
                </select>
              </div>
            </div>

            <div className="form-group col-md-4 col-sm-6 col-xs-12">
              <div>
                <label>&nbsp; Status</label>
                <br />
                <select
                  name="posted_requirmenter_status"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setPostRequirment({ ...postRequirment, [name]: value });
                  }}>
                  <option>--No Choice--</option>
                  <option>Under Construction</option>
                  <option>Terminated</option>
                  <option>Completed</option>
                  <option>Hold</option>
                </select>
              </div>
            </div>

            <div className="form-group col-md-4 col-sm-6 col-xs-12">
              <div>
                <label>&nbsp; Expected Area</label>
                <br />
                <input
                  placeholder="In Sq ft"
                  type="number"
                  name="posted_requirmenter_exceptedarea"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setPostRequirment({ ...postRequirment, [name]: value });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="row with-forms" style={{ width: "90%", marginLeft: "5%", marginRight: "5%" }}>
            <div className="form-group col-md-4 col-sm-6 col-xs-12">
              <div>
                <label>&nbsp; Min-Price</label>
                <br />
                <input
                  placeholder=" Minimum Price"
                  type="number"
                  name="posted_requirmenter_minprice"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setPostRequirment({ ...postRequirment, [name]: value });
                  }}
                />
              </div>
            </div>

            <div className="form-group col-md-4 col-sm-6 col-xs-12">
              <div>
                <label>&nbsp; Max-Price</label>
                <br />
                <input
                  placeholder=" Maximum Price"
                  type="number"
                  name="posted_requirmenter_maxprice"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setPostRequirment({ ...postRequirment, [name]: value });
                  }}
                />
              </div>
            </div>

            <div className="form-group col-md-12 col-sm-12 col-xs-12">
              <div>
                <label>&nbsp; Your Description</label>
                <br />
                <textarea
                  placeholder=" Description"
                  style={{ width: "97%", marginLeft: "0.5%", borderRadius: "5px", padding: "10px", transition: "all 0.4s" }}
                  name="posted_requirmenter_description"
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setPostRequirment({ ...postRequirment, [name]: value });
                  }}
                />
              </div>
            </div>
            <div>
              <div style={{ fontSize: "1.1rem", marginTop: "3vh", color: "black", fontFamily: 'Nunito", sans-serif', marginBottom: "2vh", fontWeight: "400" }}>&nbsp;&nbsp;Amenities & Features</div>
              <div className="row with-forms">
                <div className="form-group col-md-12 col-sm-12 col-xs-12">
                  <div className="row with-forms">
                  {amenities?.map((amenity, i) => (
                  <div className="col-lg-3  col-md-4 col-sm-6 col-xs-12" style={{ display: "flex", marginBottom: "0.7vh" }} key={i}>
                    <input type={"checkbox"} style={{ width: "2vh", height: "auto", marginRight: "1vh", bottom: "0" }} id={amenity} name={amenity} defaultChecked={false} onChange={handleChange} />
                    <label htmlFor={amenity} style={{ bottom: "0", fontSize: "1rem" }}>
                      {amenity}
                    </label>
                  </div>
                ))}
                     </div>
                  {/* <div className="row with-forms">
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginRight:'1vh',marginTop:'-1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Community Center</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Security Personal</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> 24*7 Water</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Maintenance Staff</div>                           
                          </div> 
                          <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> CCTV</div>                           
                          </div>                          
                      </div>
                      <div className="row with-forms">
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Jogging Track</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Cycling Track</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Intercom</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Park</div>                           
                          </div>  
                          <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> GYM</div>                           
                          </div>                          
                      </div>
                      <div className="row with-forms">
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Security/Fire Alarm</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Club-House</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Fire-Fighting</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Cafe-Lounge</div>                           
                          </div>     
                          <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Play area</div>                           
                          </div>                        
                      </div>
                      <div className="row with-forms">
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Mini-Theatre</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Squah-Court</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Skating-Rink</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Steam Sauna Bath</div>                           
                          </div>             
                          <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Swimming Pool</div>                           
                          </div>                
                      </div>
                      <div className="row with-forms">
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Yoga/Meditation area</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Cricket Practive Pitch</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Pet Garden</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Toddleer Play Area</div>                           
                          </div>    
                          <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Rooftop Garden</div>                           
                          </div>                          
                      </div>
                      <div className="row with-forms">
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Spa and Salon</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Concierge services</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Restaurants</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Party hall</div>                           
                          </div>    
                          <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Cinema hall</div>                           
                          </div>                          
                      </div>
                      <div className="row with-forms">
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Wi-Fi connectivity</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Lift</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> Visitor Parking</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex',marginBottom:'0.7vh'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" />
                              <div style={{ fontSize: "1rem",marginBottom:'1vh',marginTop:'-0.5vh' }}> 24*7 Power back-up</div>                           
                          </div>    
                                                
                       </div>*/}
                </div>
              </div>
            </div>
            <div className="form-group col-md-4 col-sm-6 col-xs-12">
              <button style={{ padding: "8px", marginTop: "2vh", marginLeft: "0.7vh", borderRadius: "6px" }} onClick={submitRequirment}>
                Post Requirement
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {/* // ----------------------------POST REQUIRMENT COMPONENT CLOSE---------------------------  */}
    </div>
  );
};
