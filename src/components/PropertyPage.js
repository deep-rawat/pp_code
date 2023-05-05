import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import { AdminHeader } from './AdminHeader';
import { Footer } from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import PropertyNotFoundModal from './PropertyNotFoundModal';
import { resetSearchProperty } from '../store/actions/searchPropertyAction';
export const PropertyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [properties, setProperties] = useState([{}]); 

  const searchParams = useSelector((state) => state?.searchProperty?.searchParams);
  const propertyWrapList = useSelector((state) => state?.propertyData?.data?.propertyWrapList);
  
  useEffect(() => {
      setPropertyByFilters(propertyWrapList);
  }, [propertyWrapList, searchParams]);
   
  useEffect(()=>{
    window.scrollTo(0, 0);
   },[]);

  
  const navigateToPages = (evt) => {
    evt.preventDefault();
    navigate(`/${evt.target.id}`);
  }
  const navigateToSingleProperties = (idx) => {
    delete window.document.referrer;
    navigate('/property', {state:{idx: idx, prevPath:window.location.pathname}})
  }
  
  const toLowerCase = (value) => value.toLowerCase(); 
  const setPropertyByFilters = (propertyWrapList) => {
    const temp = [];
    if(searchParams != null){
      const isKeyword = searchParams?.keyword !== "" && searchParams?.keyword !== undefined
      if(isKeyword){
        var keyword = toLowerCase(searchParams?.keyword);
        let keywordList = keyword.replace(/\s+/g, ' ').trim().split(" ");
        let indexOfUnder = keywordList.findLastIndex(n => n === "under");
        let indexOfAbove = keywordList.findLastIndex(n => n === "above");
        var underPrice = indexOfUnder !== -1 && keywordList[indexOfUnder + 1] ? (!isNaN(keywordList[indexOfUnder + 1]) ? parseInt(keywordList[indexOfUnder + 1]) : false) : false;
        var abovePrice = indexOfAbove !== -1 && keywordList[indexOfAbove + 1] ? (!isNaN(keywordList[indexOfAbove + 1]) ? parseInt(keywordList[indexOfAbove + 1]) : false) : false;
      }
    let results = searchParams?.category ? 
                  propertyWrapList.filter(property => property.propertyObj.PP_Category__c === searchParams?.category) :
                  propertyWrapList;
    results = searchParams?.status ? 
              results.filter(property => property.propertyObj.PP_Property_Status__c === searchParams?.status) :
              results;
    results = searchParams?.minPrice ? 
              results.filter(property => property.propertyObj.PP_Basic_Sales_Price__c >= searchParams?.minPrice) :
              results;
    results = searchParams?.maxPrice ? 
              results.filter(property => property.propertyObj.PP_Basic_Sales_Price__c <= searchParams?.maxPrice) :
              results;
    results = !searchParams?.maxPrice && underPrice ?
              results.filter(property => property.propertyObj.PP_Basic_Sales_Price__c <= underPrice) :
              results; 
    results = !searchParams?.minPrice && abovePrice ?
              results.filter(property => property.propertyObj.PP_Basic_Sales_Price__c >= abovePrice) :
              results; 
    propertyWrapList = !abovePrice && !underPrice && searchParams?.keyword ?
              results.filter(property => !toLowerCase(property.propertyObj.Name).search(keyword) ||
                                         !toLowerCase(property.propertyObj.PP_Category__c).search(keyword) ||
                                         !toLowerCase(property.propertyObj.PP_Property_Status__c).search(keyword) ||
                                         !toLowerCase(property.propertyObj.PP_Unit_Status__c).search(keyword)) :
              results;
      for(let i=0; i<propertyWrapList?.length; i++){
        let property = propertyWrapList[i].propertyObj;
        property["image"] = propertyWrapList[i].imageUrlList[0];
        property["idx"] = i;
        if(searchParams?.amenities.length > 0){
          let tempAmenity = [];
          const amenities = property.PP_Amenities__c.split(";");
          searchParams?.amenities?.forEach(amenity => {
            if(amenities.find( item => item === amenity)){
              tempAmenity.push(amenities.find( item => item === amenity));
            }
          });
          if(tempAmenity.length === searchParams?.amenities.length){
            temp.push(property);
          }   
        }
        else{
          temp.push(property);
        }
      }
    }
    else{
      for(let i=0; i<propertyWrapList?.length; i++){
        let property = propertyWrapList[i].propertyObj;
        property["image"] = propertyWrapList[i].imageUrlList[0];
        property["idx"] = i;
        temp.push(property);
      }
      
    }
    setTimeout(() => {
      dispatch(resetSearchProperty());
    }, 1000);
    setProperties(temp);
  }
  return (
    <>
   
{/* <!-- ======= Intro Single ======= --> */}
{properties.length===0?<PropertyNotFoundModal/>:
<>
<AdminHeader active="properties"/>
<section className="intro-single">
  <div className="container">
    <div className="row">
      <div className="col-md-12 col-lg-8">
        <div className="title-single-box">
          <h1 className="title-single">Our Amazing Properties</h1>
          <span className="color-text-a">Grid Properties</span>
        </div>
      </div>
      <div className="col-md-12 col-lg-4">
        <nav aria-label="breadcrumb" className="breadcrumb-box d-flex justify-content-lg-end">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" id='/' onClick={navigateToPages}>Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Properties Grid
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</section>
{/* <!-- End Intro Single--> */}

{/* <!-- ======= Property Grid ======= --> */}
<section className="property-grid grid">
  <div className="container">
    <div className="row">
      <div className="col-sm-12">
        <div className="grid-option">
          
        </div>
      </div>
      {properties.map((property, i)=>(
        <div className="col-md-4" key={i}>
        <div className="card-box-a card-shadow">
          <div className="img-box-a">
            <img src={property.image} alt="" className="img-a" style={{height:'300px', width:'100%'}}/>
          </div>
          <div className="card-overlay">
            <div className="card-overlay-a-content">
              <div className="card-header-a">
                <h2 className="card-title-a">
                  <span onClick={()=> navigateToSingleProperties(property.idx)} style={{cursor: 'pointer'}}>{property.Name}</span>
                  
                </h2>
              </div>
              <div className="card-body-a">
                <div className="price-box d-flex">
                  <span className="price-a">&#8377; {property.PP_Basic_Sales_Price__c}</span>
                </div>
                <span onClick={()=> navigateToSingleProperties(property.idx)} style={{cursor: 'pointer'}} className="link-a">Click here to view
                  <span className="bi bi-chevron-right"></span>
                </span>
                
              </div>
              <div className="card-footer-a">
                <ul className="card-info d-flex justify-content-around">
                  <li>
                    <h4 className="card-info-title">Category</h4>
                    <span>{property.PP_Category__c}
                    </span>
                  </li>
                  <li>
                    <h4 className="card-info-title">Status</h4>
                    <span>{property.PP_Property_Status__c}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      ))}
      
    </div>
    {/* <div className="row">
      <div className="col-sm-12">
        <nav className="pagination-a">
          <ul className="pagination justify-content-end">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabindex="-1">
                <span className="bi bi-chevron-left"></span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">1</a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">2</a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">3</a>
            </li>
            <li className="page-item next">
              <a className="page-link" href="#">
                <span className="bi bi-chevron-right"></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div> */}
  </div>
</section>
<Footer/>
</>
}

    </>
  
  )
}
