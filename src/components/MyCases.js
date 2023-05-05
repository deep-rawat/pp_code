import React  from "react";
import { AdminHeader } from "./AdminHeader";
import { Footer } from "./Footer";
import { useSelector } from "react-redux";
export const MyCases = () => {
  const caseList = useSelector((state) => state?.propertyData?.data?.caseList);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return (
    <>
      <AdminHeader />
      <div className="card" style={{margin:'5rem 1rem 0 1rem'}}>
        <h5 className="card-header d-flex">
        <span style={{display: 'flex',
                    width: '30px',
                    height: '30px',
                    borderRadius: '3px',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
        <i className="bi bi-briefcase-fill" style={{color:'#8590a4'}}></i>
        </span>
        <span style={{marginLeft:'5px', marginTop:'2px'}}>Cases</span>
        </h5> 
        <div className="card-body" style={{marginTop:'1rem'}}>
        <div className="accordion accordion-flush" id="accordionFlushExample">
            {caseList?.map((item, index) =>(
                <div className="card" key={index}> 
                    <div className="card-body">
                        <h5 className="card-title">Property Name : {item?.Property__r?.Name}</h5>
                        <p className="card-text" style={{marginTop:'-15px'}}>Date : {months[new Date(item?.CreatedDate).getMonth()]}&nbsp;
                                                                                    {new Date(item?.CreatedDate).getDate()},&nbsp;
                                                                                    {new Date(item?.CreatedDate).getFullYear()}</p>
                        <p className="card-text" style={{marginTop:'-15px'}}>Description : {item?.Description}</p>
                        <p className="card-text" style={{marginTop:'-15px'}}>Status : {item?.Status}</p>
                        { !item.caseComment ? <div className="accordion-item">
                            <h2 className="accordion-header" id={"flush-heading" + index}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#flush-collapse" + index} aria-expanded="false" aria-controls={"flush-collapse"+ index}>
                                Case Comment
                            </button>
                            </h2>
                            <div id={"flush-collapse" + index} className="accordion-collapse collapse" aria-labelledby={"flush-heading" + index} data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the first item's accordion body.</div>
                            </div>
                        </div> : ''}
                    </div>
                </div>         
            ))}
            </div>
        </div>
    </div>
      <Footer />
    </>
  );
};
