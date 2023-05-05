import React, { useEffect, useState } from "react";
import { AdminHeader } from "./AdminHeader";
import "./Aggrement.css";
import { Footer } from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { resetUploadPropertyResponse, uploadPropertyAction } from "../store/actions/propertyAction";

export const UploadProperty = () => {
  const dispatch = useDispatch();
  const [uploadproperties, setUploadproperties] = useState({});
  const [sendAmenities, setSendAmenities] = useState([]);
  const [sendImages, setSendImages] = useState([]);
  const [amenities, setAmenities] = useState([]);
  var selectedAmenities = [];
  var allFileMainData = [];
  var uploadFileNameList = [];
  var uploadFileBase64List = [];

  const propertyWrapList = useSelector((state) => state?.propertyData?.data?.propertyWrapList);
  const uploadPropertyResponse = useSelector((state) => state?.uploadPropertyReducer);

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
    console.log(uploadPropertyResponse)
    if(uploadPropertyResponse?.data){
      toast.success("Property Uploaded Successfully", { autoClose: 3000 });
      dispatch(resetUploadPropertyResponse());
    }
    showSpinner(uploadPropertyResponse?.loading);
  }, [uploadPropertyResponse]);

  const showSpinner = (show) => {
    const spinner = document.getElementById("spinner");
    show ? spinner.classList.remove("d-none") : spinner.classList.add("d-none");
  };
  

  function validate() {
    var title = document.getElementById("property_title");
    if (title.value === "" || title.value.charAt(0) === " ") {
      toast.error("Please Enter Valid Property Title");
      title.scrollIntoView();
      title.focus();
      return false;
    }
    title = document.getElementsByName("property_price")[0];
    if (!/^\d+$/.test(title.value) && title.value.length > 0) {
      toast.error("Enter Valid Price");
      title.focus();
      title.scrollIntoView();
      return false;
    }
    title = document.getElementsByName("property_buildup_area")[0];
    if (!/^\d+$/.test(title.value) && title.value.length > 0) {
      toast.error("Enter Valid Build-up Area");
      title.focus();
      title.scrollIntoView();
      return false;
    }
    title = document.getElementsByName("property_area")[0];
    if (!/^\d+$/.test(title.value) && title.value.length > 0) {
      toast.error("Enter Valid Area");
      title.focus();
      title.scrollIntoView();
      return false;
    }
    return true;
  }

  const submitProperty = () => {
    var valid = validate();
    if (valid) {
      var fileList = sendImages;
      for (var i = 0; i < fileList.length; i++) {
        uploadFileNameList.push(fileList[i].fileName);
        uploadFileBase64List.push(fileList[i].fileContent);
      }

      const raw = {
        uploadNewProperty: "UPLOAD NEW PROPERTY",
        title: uploadproperties.hasOwnProperty("property_title") ? uploadproperties.property_title : "",
        category: uploadproperties.hasOwnProperty("property_category") ? uploadproperties.property_category : "",
        //  currencyType              : uploadproperties.hasOwnProperty('property_sale_currencyType') ? uploadproperties.property_sale_currencyType : '',
        price: uploadproperties.hasOwnProperty("property_price") ? uploadproperties.property_price : "",
        area: uploadproperties.hasOwnProperty("property_area") ? uploadproperties.property_area : "",
        status: uploadproperties.hasOwnProperty("property_status") ? uploadproperties.property_status : "",
        buildUpArea: uploadproperties.hasOwnProperty("property_buildup_area") ? uploadproperties.property_buildup_area : "",
        buildingAge: uploadproperties.hasOwnProperty("property_buildingAge") ? uploadproperties.property_buildingAge : "",
        houseUnitNo: uploadproperties.hasOwnProperty("property_houseUnitNo") ? uploadproperties.property_houseUnitNo : "",
        unitType: uploadproperties.hasOwnProperty("property_unitType") ? uploadproperties.property_unitType : "",
        unitStatus: uploadproperties.hasOwnProperty("property_unitStatus") ? uploadproperties.property_unitStatus : "",
        description: uploadproperties.hasOwnProperty("property_description") ? uploadproperties.property_description : "",
        amenities: sendAmenities,
        uploadImageName: uploadFileNameList.length === 0 ? [] : uploadFileNameList,
        uploadImageBase: uploadFileBase64List.length === 0 ? [] : uploadFileBase64List,
      };
      dispatch(uploadPropertyAction(raw));
    }
  };

  const getUploadFiles = (e) => {
    allFileMainData = [];
    document.getElementById("uploadImagespreview").innerHTML = "";
    var h2 = document.createElement("h2");
    h2.id = "uploaded_files";
    document.getElementById("uploadImagespreview").appendChild(h2);

    var FileName = "";

    for (let i = 0; i < e.target.files.length; i++) {
      const element = e.target.files[i].name;
      FileName = FileName + "  " + element.toUpperCase() + ", ";

      var img = document.createElement("img");
      img.style = "height:10vw;padding-left:2vh;padding-bottom:2vh;";
      img.src = URL.createObjectURL(e.target.files[i]);
      document.getElementById("uploadImagespreview").appendChild(img);
    }
    document.getElementById("uploaded_files").innerHTML = FileName;
    for (let i = 0; i < e.target.files.length; i++) {
      var file = e.target.files[i];
      dataOfFile(file);
    }
    setSendImages(allFileMainData);
  };
  const getPropertyValues = (e) => {
    const { name, value } = e.target;
    setUploadproperties({ ...uploadproperties, [name]: value });
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

  function dataOfFile(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var fileContent = reader.result;
      var base64 = "base64,";
      var dataStart = fileContent.indexOf(base64) + base64.length;
      fileContent = fileContent.substring(dataStart);
      var fileObj = { fileName: file.name, fileType: file.type, fileContent: fileContent, Size: file.size };
      allFileMainData.push(fileObj);
      return fileContent;
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      {/* ---------------------------ADMIN HEADER---------------------------- */}

      <AdminHeader active="uploadproperty" />
      <div className="loading d-none" id="spinner">
          Loading&#8230;
        </div>

      {/* <Toaster  position="top-center"  reverseOrder={false}/> */}
      <div style={{ width: "100%", margin: "10vh 0 0 0", fontSize: "2rem", fontFamily: "sans-serif", fontWeight: "500" }} className="text-center">
        Upload Your Property Here
      </div>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <div className="uploadproperty-maindiv" id="uploadPropsDiv">
        <div className="uploadproperty-div2">
          {/* ------------------------------BASIC INFORMATION LABEL--------------------------------- */}
          <div style={{ fontSize: "2rem", color: "aqua", fontWeight: "900", width: "11vw", height: ".5vh", background: "aqua", margin: "2.5vh 0" }}></div>

          <div className="postproperty-labels">Basic Information</div>

          <div className="field-label">
            Property Title <span style={{ color: "red" }}>*</span>
          </div>
          <input type="text" name="property_title" placeholder=" Enter Property Title" onChange={getPropertyValues} defaultValue="" id="property_title" />

          <div className="row with-forms">
            <div className="form-group col-md-6 col-sm-6 col-xs-12">
              <div className="field-label">Category</div>
              <select name="property_category" onChange={getPropertyValues}>
                <option value={""}> None </option>
                <option> Appartment</option>
                <option> Floors</option>
                <option> Penthouse</option>
                <option> Garden Appartment</option>
                <option> F1 Appartment</option>
                <option> Ultra luxury Appartment</option>
                <option> Duplex</option>
                <option> Triplex</option>
                <option> Quadplex</option>
              </select>
            </div>
            {/* <div className="form-group col-md-6 col-sm-6 col-xs-12" >
              <div className="field-label">Currency</div>
              <select onChange={getPropertyValues} name="property_sale_currencyType">
                    <option value={""}> None </option>
                    <option> INR - Indian Rupee</option>
                    <option> USD - U.S Dollar</option>
              </select>
            </div> */}
            <div className="form-group col-md-6 col-sm-6 col-xs-12">
              <div className="field-label">Price</div>
              <input type="number" name="property_price" placeholder="Enter Price" onChange={getPropertyValues} />
            </div>
            <div className="form-group col-md-6 col-sm-6 col-xs-12">
              <div className="field-label">Area</div>
              <input type="number" name="property_area" placeholder=" Sq Ft" onChange={getPropertyValues} />
            </div>
            <div className="form-group col-md-6 col-sm-12 col-xs-12">
              <div className="field-label">Property Status</div>
              <select style={{ height: "3rem" }} name="property_status" onChange={getPropertyValues}>
                <option value={""}> None </option>
                <option>&nbsp;Under Construction</option>
                <option>&nbsp;Hold</option>
                <option>&nbsp;Completed</option>
                <option>&nbsp;Terminated</option>
              </select>
            </div>
            <div className="form-group col-md-6 col-sm-12 col-xs-12">
              <div className="field-label">Build-up Area</div>
              <input type="number" name="property_buildup_area" placeholder="Enter Build-up Area " onChange={getPropertyValues} />
            </div>
            <div className="form-group col-md-6 col-sm-12 col-xs-12">
              <div className="field-label">Building Age </div>
              <select style={{ height: "3rem" }} name="property_buildingAge" onChange={getPropertyValues}>
                <option value={""}> None </option>
                <option>&nbsp;Brand New</option>
                <option>&nbsp;Less than 2 years</option>
                <option>&nbsp;Less than 5 years</option>
                <option>&nbsp;Less than 10 years</option>
                <option>&nbsp;Above 10 Years</option>
                {/* <option>&nbsp;0 - 50 Years</option> */}
              </select>
            </div>
            <div className="form-group col-md-6 col-sm-12 col-xs-12">
              <div className="field-label">Address </div>
              <input type="text" name="property_houseUnitNo" placeholder=" Enter Address" onChange={getPropertyValues} />
            </div>
            <div className="form-group col-md-6 col-sm-12 col-xs-12">
              <div className="field-label">Unit Type </div>
              <select style={{ height: "3rem" }} name="property_unitType" onChange={getPropertyValues}>
                <option value={0}> None </option>
                <option>&nbsp;2BR</option>
                <option>&nbsp;3BR</option>
              </select>
            </div>
            <div className="form-group col-md-6 col-sm-12 col-xs-12">
              <div className="field-label">Unit Status</div>
              <select style={{ height: "3rem" }} name="property_unitStatus" onChange={getPropertyValues}>
                <option value={""}> None </option>
                <option>&nbsp;Blocked by Management</option>
                <option>&nbsp;Temporarily Blocked</option>
                <option>&nbsp;Not Available for Sale</option>
                <option>&nbsp;Available</option>
                <option>&nbsp;Hold for Booking</option>
                <option>&nbsp;Sold</option>
                <option>&nbsp;Soft Book</option>
              </select>
            </div>
            <div className="form-group col-md-12 col-sm-12 col-xs-12">
              <div className="field-label">Description </div>
              <textarea
                name="property_description"
                style={{
                  width: "100%",
                  height: "8vh",
                  fontFamily: "revert",
                  border: "0.5px solid rgb(175, 165, 165)",
                  minHeight: "7vw",
                }}
                placeholder=" Your Property Description ..."
                onChange={getPropertyValues}
              />
            </div>
            {/* -------------------------------LOCATION LABEL-------------------------------- */}
            {/* <div>
              <div
                style={{
                  fontSize: "2rem",
                  color: "aqua",
                  fontWeight: "900",
                  width: "11vw",
                  height: ".4vh",
                  background: "aqua",
                  margin: "0 0 1vh 0",
                  marginTop: "5vh",
                }}
              ></div>
              <div className="postproperty-labels">Location</div>
            </div>
            <div className="form-group col-md-6 col-sm-12 col-xs-12">
              <div className="field-label">Address </div>
              <input
                type="text"
                name="property_address"
                placeholder=" Enter Address"
                onChange={(e) => {
                  const { name, value } = e.target;
                  setUploadproperties({ ...uploadproperties, [name]: value });
                }}
              />
            </div>
            <div className="form-group col-md-6 col-sm-12 col-xs-12">
              <div className="field-label">City </div>
              <input
                type="text"
                name="property_city"
                placeholder=" Enter City"
                onChange={(e) => {
                  const { name, value } = e.target;
                  setUploadproperties({ ...uploadproperties, [name]: value });
                }}
              />
            </div>
            <div className="form-group col-md-6 col-sm-12 ">
              <div className="field-label">State </div>
              <input
                type="text"
                name="property_state"
                placeholder=" Enter State"
                onChange={(e) => {
                  const { name, value } = e.target;
                  setUploadproperties({ ...uploadproperties, [name]: value });
                }}
              />
            </div>
            <div className="form-group col-md-6 col-sm-12 col-xs-12">
              <div className="field-label">Zip-Code</div>
              <input
                type="text"
                name="property_zip_code"
                placeholder=" Enter Zipcode ..."
                onChange={(e) => {
                  const { name, value } = e.target;
                  setUploadproperties({ ...uploadproperties, [name]: value });
                }}
              />
            </div> */}
            {/* ---------------------------------UPLOAD PROPERTY IMAGES----------------------------------- */}
            <div>
              <div style={{ fontSize: "2rem", color: "aqua", fontWeight: "900", width: "11vw", height: ".5vh", background: "aqua", margin: "2.5vh 0" }}></div>
              <div className="postproperty-labels">Upload Images</div>
              <div className="galerypost">
                <div className="drag">
                  <div id="uploadImagespreview">
                    <h2 id="uploaded_files">Drag &amp; drop files here …</h2>
                  </div>
                </div>
                <div className="custom-input">
                  <span>
                    <i className="fa fa-upload"></i> &nbsp;Upload photo
                  </span>
                  <input type="file" name="property_images" id="resume" onChange={getUploadFiles} multiple={true} />
                </div>
              </div>
            </div>
            {/* ---------------------------------AMENITIES & FEATURES----------------------------------- */}
            <div>
              <div style={{ fontSize: "2rem", color: "aqua", fontWeight: "900", width: "11vw", height: ".5vh", background: "aqua", margin: "2.5vh 0" }}></div>

              <div className="postproperty-labels">Amenities & Features</div>
              <div className="row">
                {/* <div className="form-group col-md-12 col-sm-12 col-xs-12"> */}
                {/* <div className="row with-forms"> */}
                {amenities?.map((amenity, i) => (
                  <div className="col-lg-3  col-md-4 col-sm-6 col-xs-12" style={{ display: "flex", marginBottom: "0.7vh" }} key={i}>
                    <input type={"checkbox"} style={{ width: "2vh", height: "auto", marginRight: "1vh", bottom: "0" }} id={amenity} name={amenity} defaultChecked={false} onChange={handleChange} />
                    <label htmlFor={amenity} style={{ bottom: "0", fontSize: "1rem" }}>
                      {amenity}
                    </label>
                  </div>
                ))}
                {/* <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Community Center</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Security Personal</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> 24*7 Water</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Maintenance Staff</div>                           
                          </div> 
                          <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> CCTV</div>                            
                          </div>                          
                        </div>
                      <div className="row with-forms">
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Jogging Track</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Cycling Track</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Intercom</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Park</div>                           
                          </div>  
                          <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> GYM</div>                           
                          </div>                          
                      </div>
                      <div className="row with-forms"> 
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Security/Fire Alarm</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Club-House</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Fire-Fighting</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Cafe-Lounge</div>                           
                          </div>     
                          <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Play area</div>                           
                          </div>                        
                       </div>
                      <div className="row with-forms">
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Mini-Theatre</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Squah-Court</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Skating-Rink</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Steam Sauna Bath</div>                           
                          </div>             
                          <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Swimming Pool</div>                           
                          </div>                
                      </div>
                      <div className="row with-forms">
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Yoga and Meditation area</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Cricket Practive Pitch</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Pet Garden</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Toddleer Play Area</div>                           
                          </div>    
                          <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Rooftop Garden</div>                           
                          </div>                          
                      </div>
                      <div className="row with-forms">
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Spa and Salon</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Concierge services</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Restaurants</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Party hall</div>                           
                          </div>    
                          <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Cinema hall</div>                           
                          </div>                          
                      </div>
                      <div className="row with-forms">
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Wi-Fi connectivity</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Lift</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> Visitor Parking</div>
                           </div>
                           <div className="form-group col-md-2 col-sm-12 col-xs-12" style={{display:'flex'}}>
                              <input type={"checkbox"}style={{ width: "1.7vh",marginTop:'-1vh',marginRight:'1vh' }}name="property_has_visitorParking" onChange={getPropertyValues}/>
                              <div style={{ fontSize: "1rem" }}> 24*7 Power back-up</div>                           
                          </div>                                                     */}
                {/* </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
          <div>
            <button type="button" className="submitbtn" onClick={submitProperty}>
              Add Property
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
