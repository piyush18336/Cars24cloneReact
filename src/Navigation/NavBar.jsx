import React from 'react';
import logo from '../Images/CARS24_Official_New_Logo.png'
import './NavBar.css'
import { FiLogIn } from "react-icons/fi";
import {  NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function NavBar({setLocalUser,User,setLoggedInUser}) {

  const[user, setUser] = useState({})

  const navigate = useNavigate();
  var userkey = localStorage.key(0);

  const handleLogout = ()=>{
   userkey =  localStorage.clear();
   setUser(''); 
   setLocalUser(false);
   setLoggedInUser('');
   navigate('/Login');
  }
  let data = {};
  useEffect(()=>{
     data = JSON.parse(localStorage.getItem('user'));
    if(data){
      setUser(data[0]);
    }
  },[userkey])

  

  return (
    <div className='container-fluid'>
        <nav className='navbar'>
          <ul className='navItems'>
           <li><img className='logo' src={logo} alt="logo"/></li> 
            <li >
                <NavLink className='home' to="/">Home</NavLink>
            </li>

            <div className='user'> Account<FiLogIn/>
                  <div className="user-content">

                  {user.Email && user.Password? <button className='Logout' onClick={()=>handleLogout()}>Logout</button>: <NavLink to="/Login">Login</NavLink> }  
                  {user.Email && user.Password?  <NavLink to={`/${User}/UpdateProfile`}>Update Profile</NavLink>: <NavLink to="/SignUp">Sign Up</NavLink>
                  }
            </div> 
          </div>
              { user  && (user.UserType === 'Admin') ? <>  
              <li>
                  <NavLink className='update-data' to="/admin/UpdateData">Update Data</NavLink>
              </li>
              <li>
                  <NavLink className='update-data' to='/admin/UpdateUser'>Update User</NavLink>
              </li> 
              </> : null}

            {user.Email && user.Password ? <span className='user-detail'>{user.Name}</span> : null } 
            
           { user.Email && user.Password ?<div className='image-card'>
               { user.Image}
              </div> : null }

          </ul>       
        </nav>
    </div>
  );
}
