import React from 'react'
import {  Routes, Route } from "react-router-dom";
import UpdateData from '../Components/UpdateData';
import AddForm from '../Components/AddForm';
import Modify from '../Components/Modify';
import UpdateUser from '../Components/UpdateUser';
import AddUser from '../Components/AddUser';
import EditUser from '../Components/EditUser';
import ProtectedRoute from '../Components/ProtectedRoute';
import UpdateProfile from '../Components/UpdateProfile';

const Admin = () => {
  return (
    <Routes>    
    <Route path='/UpdateData'  element={<ProtectedRoute Component={UpdateData}/>}/>
    <Route path='/UpdateUser' element={<ProtectedRoute Component={UpdateUser}/>}/>
    <Route path='/AddForm' element={<ProtectedRoute Component={AddForm}/>}/>
    <Route path='/UpdateProfile' element={<ProtectedRoute Component={UpdateProfile}/>}/>
    <Route path='/AddUser' element={<ProtectedRoute Component={AddUser}/>}/>
    <Route path='/EditUser' element={<ProtectedRoute Component={EditUser}/>}/>
    <Route path='/Modify' element={<ProtectedRoute Component={Modify}/>}/>                      
    </Routes>  
  )
}

export default Admin
