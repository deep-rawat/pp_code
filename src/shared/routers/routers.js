import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./privateRoutes";
import { Home } from '../../components/Home';
import { About } from "../../components/About";
import { Contact } from "../../components/Contact";
import { PropertySingle } from "../../components/PropertySingle";
import { PropertyPage } from "../../components/PropertyPage";
import { LoginPage } from "../../components/LoginPage";
import {ProfilePage} from '../../components/ProfilePage';
import { MyCases } from "../../components/MyCases";
import { Aggrement } from '../../components/Aggrement';
import {UploadProperty} from '../../components/UploadProperty';
import { PostRequirement } from "../../components/PostRequirement";

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes/>}>
            <Route path="/aggrement" element={<Aggrement/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/mycases" element={<MyCases/>} />
            <Route path="/uploadproperty" element={<UploadProperty/>} />
            <Route path="/postrequirment" element={<PostRequirement/>} />
        </Route>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/property" element={<PropertySingle/>}/>
        <Route path="/properties" element={<PropertyPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;