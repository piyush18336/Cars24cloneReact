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

const Customer = React.lazy(()=>import('./Users/Customer'));
const Admin = React.lazy(()=>import('./Users/Admin'));

const App = () =>{

    const[user, setUser] = useState({});
    const[localUser,setLocalUser] = useState('');
    

    useEffect(()=>{
      let data  = JSON.parse(localStorage.getItem('user'));
        if(data){
        setUser(data[0]);  
        }  
    },[localUser]);

    console.log(user);
    return(
      <>
      <BrowserRouter>  
            <NavBar/>
            <Suspense fallback={<div>Loading...</div>}>
            <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Login' element={<Login setLocalUser={setLocalUser}/>}/>
            <Route path='/SignUp' element={<SignUp/>}/>
            {/* {user.UserType === 'Customer' &&   <Route path='/Customer'  element={<Customer/>}/>}
            {user.UserType ==='Admin' && <Route path='/Admin'  element={<Admin/>}/> }
            <Route path='*' element={<PageNotFound/>}/> */}
            <Route path='/Customer'  element={<Customer/>}/>
            <Route path='/Admin'  element={<Admin/>}/>
            <Route path='*' element={<PageNotFound/>}/>
            </Routes>
            </Suspense>
       </BrowserRouter>      
      </>    
    );
}

export  default App;