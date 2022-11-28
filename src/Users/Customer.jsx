import React from "react";
import { Routes, Route } from "react-router-dom";
 import UpdateProfile from '../Components/UpdateProfile';


const Customer = () => {

  return (

    <Routes>
      {/* <Route path='/UpdateProfile' element={<ProtectedRoute Component={UpdateProfile}/>}/> */}

       <Route path="/UpdateProfile" element={<UpdateProfile/>} />

    </Routes>
  );
};
export default Customer;
