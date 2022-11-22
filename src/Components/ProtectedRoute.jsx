import React, { Component, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {

    const {Component} = props;
   
    const navigate = useNavigate();
    useEffect(()=>{
      let user = localStorage.getItem('user');
      if(!user){
        navigate('/Login');
      }
    },[]);
  return (
        <Component/>
  )
}

export default ProtectedRoute
