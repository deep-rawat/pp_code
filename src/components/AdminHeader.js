import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Aggrement.css";
import { useSelector, useDispatch } from "react-redux";
import { resetLoginUser } from "../store/actions/loginUserAction";
import { searchProperty } from "../store/actions/searchPropertyAction";
export const AdminHeader = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notificationList, setNotificationList] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [propertyStatusOptions, setPropertyStatusOptions] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const loginUserContactObjData = useSelector((state) => state?.loginUser?.data);
  const data = useSelector((state) => state?.propertyData?.data);

  useEffect(() => {
    window.intializePage();
    if (props?.active != null) {
      document.getElementById(props?.active)?.classList?.add("active-link");
    }
  }, [props]);

  useEffect(() => {
    const tempCategory = new Set();
    const tempPropertyStatus = new Set();
    const amenitiesData = new Set();

    for (let i = 0; i < data?.propertyWrapList?.length; i++) {
      const property = data?.propertyWrapList[i]?.propertyObj;

      tempPropertyStatus.add(property.PP_Property_Status__c);
      tempCategory.add(property.PP_Category__c);

      let temp = property.PP_Amenities__c.split(";");
      for (let i = 0; i < temp.length; i++) {
        amenitiesData.add(temp[i]);
      }
    }

    setAmenities(Array.from(amenitiesData));
    setCategoryOptions(Array.from(tempCategory));
    setPropertyStatusOptions(Array.from(tempPropertyStatus));
    setNotificationList(data?.notificationList);

    const profileImage = document.getElementById("profileImage");
    if (profileImage != null) profileImage.textContent = loginUserContactObjData?.FirstName?.charAt(0) + loginUserContactObjData?.LastName?.charAt(0);
  }, [data]);

  const propertySearch = {
    category: "",
    status: "",
    minPrice: "",
    maxPrice: "",
  };

  const navigateToPages = (evt) => {
    evt.preventDefault();
    navigate(`/${evt.target.id}`);
  };
  const [categoryValue, setCategoryValue] = useState();
  const [statusValue, setStatusValue] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [keyword, setKeyword] = useState();
  const onValueChange = (evt) => {
    const setValue = evt.target.id === "category" ? setCategoryValue : evt.target.id === "status" ? setStatusValue : evt.target.id === "minPrice" ? setMinPrice : evt.target.id === "maxPrice" ? setMaxPrice : evt.target.id === "keyword" ? setKeyword : null;
    setValue(evt.target.value);
  };
  const searchPropertyHandler = () => {
    const temp = [];
    const amenitiesList = document.getElementsByClassName("amenities-list");
    for (let i = 0; i < amenitiesList?.length; i++) {
      if (amenitiesList[i]?.checked) {
        temp.push(amenitiesList[i]?.name);
        amenitiesList[i].checked = false;
      }
    }
    propertySearch["category"] = categoryValue;
    propertySearch["status"] = statusValue;
    propertySearch["minPrice"] = minPrice;
    propertySearch["maxPrice"] = maxPrice;
    propertySearch["keyword"] = keyword;
    propertySearch["amenities"] = temp;
    setCategoryValue("");
    setStatusValue("");
    setMinPrice("");
    setMaxPrice("");
    setKeyword("");
    document.getElementById("close-btn").click();
    if (!(propertySearch?.category === "" && propertySearch?.status === "" && propertySearch?.minPrice === "" && propertySearch?.maxPrice === "" && propertySearch?.keyword === "" && propertySearch?.amenities?.length === 0)) {
      dispatch(searchProperty(propertySearch));
    }
    navigate("/properties");
  };

  const showMenuBar = () => {
    let menu = document.getElementById("menuBar");
    menu.classList.toggle("search-bar-show");
    let notificationIcon = document.getElementById("notification-icon");
    let userIcon = document.getElementById("user-icon");
    if (menu.classList.contains("search-bar-show")) {
      notificationIcon.disabled = true;
      userIcon.disabled = true;
    } else {
      notificationIcon.disabled = false;
      userIcon.disabled = false;
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(resetLoginUser());
  };
  return (
    <>
      <div className="click-closed"></div>
      <div className="box-collapse">
        <div className="title-box-d">
          <h3 className="title-d">Search Property</h3>
        </div>
        <span className="close-box-collapse right-boxed bi bi-x" id="close-btn"></span>
        <div className="box-collapse-wrap form">
          <form className="form-a">
            <div className="row">
              <div className="col-md-12 mb-2">
                <div className="form-group">
                  <label className="pb-2" htmlFor="Type">
                    Keyword
                  </label>
                  <input type="text" className="form-control form-control-lg form-control-a" placeholder="Keyword" id="keyword" onChange={onValueChange} value={keyword} />
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <div className="form-group mt-3">
                  <label className="pb-2" htmlFor="Type">
                    Category
                  </label>
                  <select className="form-control form-select form-control-a" id="category" onChange={onValueChange} value={categoryValue}>
                    {categoryOptions.map((category, i) => (
                      <option key={i}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <div className="form-group mt-3">
                  <label className="pb-2" htmlFor="bedrooms">
                    Status
                  </label>
                  <select className="form-control form-select form-control-a" id="status" onChange={onValueChange} value={statusValue}>
                    {propertyStatusOptions.map((status, i) => (
                      <option key={i}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <div className="form-group mt-3">
                  <label className="pb-2" htmlFor="minPrice">
                    Min Price
                  </label>
                  <input type="text" className="form-control" placeholder="Minimum Pirce" id="minPrice" onChange={onValueChange} value={minPrice} />
                </div>
              </div>
              <div className="col-md-6 mb-2">
                <div className="form-group mt-3">
                  <label className="pb-2" htmlFor="maxPrice">
                    Max Price
                  </label>
                  <input type="text" className="form-control" placeholder="Maximum Price" id="maxPrice" onChange={onValueChange} value={maxPrice} />
                </div>
              </div>
              <div className="col-md-12">
                <label className="pb-2">Amenities</label>
                <div style={{ width: "100%", marginBottom: "10px" }}>
                  <div onClick={() => document.getElementById("checkboxes").classList.toggle("d-none")} style={{ position: "relative" }}>
                    <select style={{ width: "100%" }} className="form-control form-select form-control-a">
                      <option>Select Amenities</option>
                    </select>
                    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}></div>
                  </div>
                  <div id="checkboxes" className="d-none" style={{ border: "1px #dadada solid", borderRadius: "5px" }}>
                    <div style={{ height: "117px", overflow: "auto" }}>
                      {amenities.map((item, i) => (
                        <div style={{ display: "flex", marginLeft: "10px" }} key={i}>
                          <input type="checkbox" data-id={i} name={item} className="amenities-list" defaultChecked={false} style={{ margin: "8px 5px 0 0", height: "15px", width: "15px" }} />
                          <label style={{ fontSize: "larger" }}>{item}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <button className="btn btn-b" onClick={searchPropertyHandler}>
            Search Property
          </button>
        </div>
      </div>

      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <a href="/" className="logo d-flex align-items-center">
            <img src="NiceAdminAssets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">PropertyPortal</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn d-block d-xl-none" onClick={showMenuBar}></i>
        </div>
        {/* <!-- End Logo --> */}

        <div className="search-bar" id="menuBar">
          <div className="d-grid d-xl-block">
            <a
              id="home"
              href="home"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="menu-nav-link">
              Home
            </a>
            <a id="about" href="about" onClick={navigateToPages} className="menu-nav-link m-xl-4">
              About
            </a>
            <a id="properties" href="properties" onClick={navigateToPages} className="menu-nav-link m-xl-3">
              Property
            </a>
            <a id="contact" href="contact" onClick={navigateToPages} className="menu-nav-link m-xl-3">
              Contact
            </a>
            <div className="dropdown">
              <span
                className="menu-nav-link m-xl-3"
                style={{ color: "#5061f2" }}
                onClick={() => {
                  document.getElementById("seeMorebtn").style.display = "block";
                  setTimeout(() => {
                    document.getElementById("seeMorebtn").style.display = "none";
                  }, 2000);
                }}>
                More<span className="dropdown-toggle ps-2" style={{ fontSize: "20px" }}></span>
              </span>
              <div className="dropdown-content" id="seeMorebtn">
                <ul>
                  <li>
                    <a id="aggrement" href="aggrement" onClick={navigateToPages} className="menu-nav-link m-xl-3">
                      Rent Aggrement
                    </a>
                  </li>
                  <li>
                    <a id="uploadproperty" href="uploadproperty" onClick={navigateToPages} className="menu-nav-link m-xl-3">
                      Upload Property
                    </a>
                  </li>
                  <li>
                    <a id="postrequirment" href="postrequirment" onClick={navigateToPages} className="menu-nav-link m-xl-3 ">
                      Post Requirement
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- End Search Bar --> */}

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            {/* <!-- End Search Icon--> */}
            <li style={{ marginLeft: "4%", marginRight: "-4%" }}>
              <button type="button" className="btn navbar-toggle-box navbar-toggle-box-collapse nav-link nav-icon" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
                <i className="bi bi-search"></i>
              </button>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link nav-icon" href="# " onClick={(e) => e.preventDefault()} data-bs-toggle="dropdown" id="notification-icon" style={{ marginRight: "20px" }}>
                <i className="bi bi-bell"></i>
                {/* <span className="badge bg-primary badge-number">{notificationList.length}</span> */}
              </a>
              {/* <!-- End Notification Icon --> */}

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">You have {notificationList?.length} new notifications</li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {notificationList?.map((item, i) => (
                  <>
                    <li key={i}>
                      <hr className="dropdown-divider" />
                      <div className="notification-item">
                        <i className="bi bi-exclamation-circle text-warning"></i>
                        <div dangerouslySetInnerHTML={{ __html: `<h4>${item.Name}</h4>${item.PP_Body__c}` }}></div>
                      </div>
                    </li>
                  </>
                ))}
                {/* <li className="notification-item">
              <i className="bi bi-exclamation-circle text-warning"></i>
              <div>
                <h4>Lorem Ipsum</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>30 min. ago</p>
              </div>
            </li>

            <li>
              <hr className="dropdown-divider"/>
            </li>

            <li className="notification-item">
              <i className="bi bi-x-circle text-danger"></i>
              <div>
                <h4>Atque rerum nesciunt</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>1 hr. ago</p>
              </div>
            </li>

            <li>
              <hr className="dropdown-divider"/>
            </li>

            <li className="notification-item">
              <i className="bi bi-check-circle text-success"></i>
              <div>
                <h4>Sit rerum fuga</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>2 hrs. ago</p>
              </div>
            </li>

            <li>
              <hr className="dropdown-divider"/>
            </li>

            <li className="notification-item">
              <i className="bi bi-info-circle text-primary"></i>
              <div>
                <h4>Dicta reprehenderit</h4>
                <p>Quae dolorem earum veritatis oditseno</p>
                <p>4 hrs. ago</p>
              </div>
            </li>

            <li>
              <hr className="dropdown-divider"/>
            </li> */}
              </ul>
              {/* <!-- End Notification Dropdown Items --> */}
            </li>
            {/* <!-- End Notification Nav --> */}

            <li className="nav-item dropdown pe-3">
              <a className="nav-link nav-profile d-flex align-items-center pe-0" href="# " onClick={(e) => e.preventDefault()} data-bs-toggle="dropdown" id="user-icon">
                {loginUserContactObjData != null ? (
                  <>
                    <div id="profileImage"></div>
                    <span className="d-none d-md-block dropdown-toggle ps-2">{loginUserContactObjData?.FirstName + " " + loginUserContactObjData?.LastName}</span>
                  </>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" onClick={() => navigate("/login")}>
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                  </svg>
                )}
              </a>
              {/* <!-- End Profile Iamge Icon --> */}

              {loginUserContactObjData != null && (
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                  <li className="dropdown-header">
                    <h6>{loginUserContactObjData?.FirstName + " " + loginUserContactObjData?.LastName}</h6>
                    {/* <span>Web Designer</span> */}
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <span
                      className="dropdown-item d-flex align-items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/profile");
                      }}
                      id="profile"
                      style={{ cursor: "pointer" }}>
                      <i className="bi bi-person"></i>
                      <span>My Profile</span>
                    </span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="# " onClick={(e) => e.preventDefault()}>
                      <i className="bi bi-gear"></i>
                      <span>Account Settings</span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="mycases"
                      id="mycases"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/mycases");
                      }}>
                      <i className="bi bi-briefcase"></i>
                      <span>My Cases</span>
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="# " onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Sign Out</span>
                    </a>
                  </li>
                </ul>
              )}
              {/* <!-- End Profile Dropdown Items --> */}
            </li>
            {/* <!-- End Profile Nav --> */}
          </ul>
        </nav>
        {/* <!-- End Icons Navigation --> */}
      </header>
    </>
  );
};
export default AdminHeader;
