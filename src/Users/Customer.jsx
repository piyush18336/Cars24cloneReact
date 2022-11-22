import React from 'react'
import {  Routes ,Route} from 'react-router-dom';
import ProtectedRoute from '../Components/ProtectedRoute';
import UpdateProfile from '../Components/UpdateProfile';
const Customer = () => {

    console.log("customer route")
  return (
    <Routes>
    {/* <Route path='/UpdateProfile' element={<ProtectedRoute Component={UpdateProfile}/>}/> */}
    <Route path='/UpdateProfile' element={<UpdateProfile/>}/>
    </Routes>
  )
}
export default Customer
