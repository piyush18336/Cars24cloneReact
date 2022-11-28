import React from 'react'
import {  Routes, Route } from "react-router-dom";
import UpdateData from '../Components/UpdateData';
import AddForm from '../Components/AddForm';
import Modify from '../Components/Modify';
import UpdateUser from '../Components/UpdateUser';
import AddUser from '../Components/AddUser';
import EditUser from '../Components/EditUser';
import UpdateProfile from '../Components/UpdateProfile';

const Admin = () => {
  return (
    <Routes>    
              <Route path='/UpdateData' element={<UpdateData/>} />
              <Route path='/UpdateUser' element={<UpdateUser/>} />
              <Route path='/AddForm' element={<AddForm/>} />
              <Route path='/UpdateProfile' element={<UpdateProfile/>} />
              <Route path='/AddUser' element={<AddUser/>} />
              <Route path='/EditUser' element={<EditUser/>} />
              <Route path='/Modify' element={<Modify/>} />                    
    </Routes>  
  )
}

export default Admin
