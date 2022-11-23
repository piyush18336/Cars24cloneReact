import React, { useContext } from 'react';
import logo from '../Images/CARS24_Official_New_Logo.png'
import './NavBar.css'
import { FiLogIn } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginContext from '../Context/LoginContext';

export default function NavBar() {

  const[user, setUser] = useState({})

  const navigate = useNavigate();
  var userkey = localStorage.key(0);

  const handleLogout = ()=>{
   userkey =  localStorage.clear();
   setUser(''); 
   navigate('/Login');
  }
  let data = {};
  useEffect(()=>{
     data = JSON.parse(localStorage.getItem('user'));
    if(data){
      setUser(data[0]);
    }
  },[userkey])

  const isLoggedIn = useContext(loginContext);


  return (
    <div className='container-fluid'>
        <nav className='navbar'>
          <ul className='navItems'>
           <li><img className='logo' src={logo} alt="logo"/></li> 
            {/* <li className='dropdown'>
               <span className='dropbtn'>Location  <FcExpand /></span>
                <div className="dropdown-content">
                    <a href="#">New Delhi</a>
                    <a href="#">Jaipur</a>
                    <a href="#">Lucknow</a>
                </div>
            </li> */}
            <li >
                <NavLink className='home' to="/">Home</NavLink>
            </li>

            <div className='user'>Account <FiLogIn/>
                  <div className="user-content">

                  {user.Email && user.Password? <button className='Logout' onClick={()=>handleLogout()}>Logout</button>: <NavLink to="/Login">Login</NavLink> }  
                  {user.Email && user.Password?  <NavLink to="/UpdateProfile">Update Profile</NavLink>: <NavLink to="/SignUp">Sign Up</NavLink>
                  }
            </div> 
          </div>
              { user  && (user.UserType=='Admin') ? <>  
              <li>
                  <NavLink className='update-data' to="/UpdateData">Update Data</NavLink>
              </li>
              <li>
                  <NavLink className='update-data' to="/UpdateUser">Update User</NavLink>
              </li> 
              </> : null}

              {/* <li>
                  <NavLink className='update-data' to="/UpdateData">Update Data</NavLink>
              </li>
              <li>
                  <NavLink className='update-data' to="/UpdateUser">Update User</NavLink>
              </li>  */}
            {user.Email && user.Password  ? <span className='user-detail'>{user.Name}</span> : null } 
            
          </ul>       
        </nav>
    </div>
  );
}
