import React from "react";
import {Link, Outlet } from "react-router-dom";
import UpdateProfile from '../Components/UpdateProfile';
import PageNotFound from '../Components/PageNotFound';

const Customer = () => {

  return (
    <>
    <Link to="UpdateProfile"></Link>
    <Outlet/>
    </>
  );
};
export default Customer;
