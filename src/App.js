import './App.css';
import NavBar from './Navigation/NavBar';
import React from 'react'
import Home from './Home/Home';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useState } from 'react';
import { useEffect } from 'react';
import PageNotFound from './Components/PageNotFound';
import LoginState from './Context/LoginState';
import ProtectedRoute from './Components/ProtectedRoute';


const UpdateProfile = React.lazy(() => import('./Components/UpdateProfile'));
const UpdateData = React.lazy(()=>import('./Components/UpdateData'));
const UpdateUser  = React.lazy(()=>import('./Components/UpdateUser'));
const AddForm = React.lazy(()=>import('./Components/AddForm'));
const AddUser = React.lazy(()=>import('./Components/AddUser'));
const EditUser = React.lazy(()=>import('./Components/EditUser'));
const Modify = React.lazy(()=>import('./Components/Modify'));


const App = () => {

  const [user, setUser] = useState({});
  const [localUser, setLocalUser] = useState('');

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('user'));
    if (data) {
      setUser(data[0]);
    }
  }, [localUser]);

  console.log(user);
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />

           
              <Route path='/Login' element={<Login setLocalUser={setLocalUser} />} />
              <Route path='/SignUp' element={<SignUp />} />
          
            

            {user.UserType === 'Customer' && <Route path="/UpdateProfile" element={<UpdateProfile />} />}

            {user.UserType === 'Admin' && <>
              <Route path='/UpdateData' element={<ProtectedRoute Component={UpdateData} />} />
              <Route path='/UpdateUser' element={<ProtectedRoute Component={UpdateUser} />} />
              <Route path='/AddForm' element={<ProtectedRoute Component={AddForm} />} />
              <Route path='/UpdateProfile' element={<ProtectedRoute Component={UpdateProfile} />} />
              <Route path='/AddUser' element={<ProtectedRoute Component={AddUser} />} />
              <Route path='/EditUser' element={<ProtectedRoute Component={EditUser} />} />
              <Route path='/Modify' element={<ProtectedRoute Component={Modify} />} />
            </>}

            <Route path='*' element={<PageNotFound />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;