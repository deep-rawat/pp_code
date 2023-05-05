import React, { useState } from 'react'
import AdminHeader from './AdminHeader'
import './Aggrement.css'
import { PostRequirement } from './PostRequirement'
import { Footer } from './Footer'


export default function PropertyNotFoundModal() {

  const [showHideModal,setShowHideModal] = useState(true);
  const [dataNotFound,setDataNotFound] = useState(true);

  return (
    <>
     {showHideModal ? 
        <>
          {dataNotFound ? 
              <div style={{background:'black',bottom:'0',top:'0',left:'0',right:'0',position:'fixed'}}>
                <div style={{width:'100%',display:'flex',justifyContent:'center'}} >  
                <AdminHeader/>
                <div className="postReq-Modal" >

                  <div style={{width:'100%',textAlign:'right'}} >
                    <button style={{border:'none',background:'transparent' , fontSize:'3vh',fontWeight:'200'}} onClick={()=>{
                      setDataNotFound(false);
                    }
                    }>
                        &#x2716;
                    </button>
                  </div>

                  <div className="text-center"  ><h5 style={{color:'#e76c46'}}>Your Search Property Not Found !</h5></div>

                  <div className="text-center" >
                      <img src="https://png.pngtree.com/png-vector/20190723/ourmid/pngtree-sad-emoji-icon-in-trendy-style-isolated-background-png-image_1583197.jpg" alt="Preview not availabe" style={{height:'20%',width:'20%'}}  />
                  </div>

                  <div style={{paddingLeft:'4%',paddingRight:'4%',paddingTop:'2vh',textAlign:'center'}} ><h5>Do you want to post your requirement ?</h5></div>

                  <div style={{textAlign:'right'}}>
                    <div style={{textAlign:"center"}} >

                      <button className="postReq-Modalbtn" id="postmodalbtn1" onClick={()=>{
                        setDataNotFound(false);
                    }
                    }
                        >&nbsp;&nbsp; Cancel &nbsp;&nbsp;</button>

                      <button className="postReq-Modalbtn" id="postmodalbtn2"  onClick={()=>{
                        setShowHideModal(false)
                        setDataNotFound(false)
                    }
                    }
                      >&nbsp; Post Requirement &nbsp;</button>

                    </div>
                  </div> 
                </div>
                </div>
              </div>
              :
              <div style={{top:'0',bottom:'0'}}>
                <AdminHeader />
                <div className='text-center' >
                  <h1 style={{marginTop:'10vh'}} >Sorry ! Your Data Not Found</h1>
                </div>
                <div style={{bottom:'1px'}}>
                  <Footer/>
                </div>
              </div>
         }
        </>
      :
      <PostRequirement />
        }
      </>
  )
}
