import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../Components/ProtectedRoute";
 import UpdateProfile from '../Components/UpdateProfile';


const Customer = () => {

  const [user,setUser] = useState('');

  setUser(localStorage.getItem('user'));

  console.log("customer route");
  return (

    <Routes>
      {/* <Route path='/UpdateProfile' element={<ProtectedRoute Component={UpdateProfile}/>}/> */}

      { user && <Route path="/UpdateProfile" element={<UpdateProfile/>} />}

    </Routes>
  );
};
export default Customer;
