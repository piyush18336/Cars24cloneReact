import './App.css';
import NavBar from './Navigation/NavBar';
import React from 'react'
import Home from './Home/Home';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import UpdateData from './Components/UpdateData';
import UpdateProfile from './Components/UpdateProfile';
import UpdateUser from './Components/UpdateUser';
import EditUser from './Components/EditUser';
import AddForm from './Components/AddForm';
import AddUser from './Components/AddUser';
import Modify from './Components/Modify';
import { Suspense, useState } from 'react';
import { useEffect } from 'react';
import {BrowserRouter , Outlet, Route , Routes} from 'react-router-dom'
import PageNotFound from './Components/PageNotFound';
import ProtectedRoute from './Components/ProtectedRoute';


// const UpdateProfile = React.lazy(() => import('./Components/UpdateProfile'));
// const UpdateData = React.lazy(() => import('./Components/UpdateData'));
// const UpdateUser = React.lazy(() => import('./Components/UpdateUser'));
// const AddForm = React.lazy(() => import('./Components/AddForm'));
// const AddUser = React.lazy(() => import('./Components/AddUser'));
// const EditUser = React.lazy(() => import('./Components/EditUser'));
// const Modify = React.lazy(() => import('./Components/Modify'));


const Admin = React.lazy(() =>import('./Users/Admin'));
const Customer = React.lazy(() =>import('./Users/Customer'));

const App = () => {

  const [user, setUser] = useState({});
  const [localUser, setLocalUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('user'));
    if (data) {
      setUser(data[0]);
      setLoggedInUser(data[0].UserType);
    }
  }, [localUser]);

  // console.log(user);
  console.log("local User",localUser);
  console.log("user",loggedInUser);
  return (
    <>
      <BrowserRouter>
        <NavBar setLocalUser={setLocalUser} User={loggedInUser} setLoggedInUser = {setLoggedInUser}/>
       
          <Routes>
            <Route  path='/' element={<Home />} />
            <Route path='Login' element={<Login setLocalUser={setLocalUser} />} />
            <Route path='/SignUp' element={<SignUp />} />

            {/* {user.UserType === 'Customer' && <Route path="/UpdateProfile" element={<UpdateProfile />} />} */}

            {/* {user.UserType === 'Admin' && <>
              <Route path='/UpdateData' element={<UpdateData/>} />
              <Route path='/UpdateUser' element={<UpdateUser/>} />
              <Route path='/AddForm' element={<AddForm/>} />
              <Route path='/UpdateProfile' element={<UpdateProfile/>} />
              <Route path='/AddUser' element={<AddUser/>} />
              <Route path='/EditUser' element={<EditUser/>} />
              <Route path='/Modify' element={<Modify/>} />
            </>} */}

            {/* <Route path='Admin' element={<Admin/>}/>

            <Route path='Customer' element={<Customer/>}/> */}

              <Route  path='admin'  element={
                    <Suspense  fallback={<div className='container'>Loading...</div>}>
                      <Admin/> 
                    </Suspense>} >
                    <Route path='UpdateData' element={<ProtectedRoute Component={UpdateData}/>} />
                    <Route path='UpdateUser' element={<ProtectedRoute Component={UpdateUser}/>} />
                    <Route path='AddForm' element={<ProtectedRoute Component={AddForm}/>} />
                    <Route path='UpdateProfile' element={<ProtectedRoute Component={UpdateProfile}/>} />
                    <Route path='AddUser' element={<ProtectedRoute Component={AddUser}/>} />
                    <Route path='EditUser' element={<ProtectedRoute Component={EditUser}/>} />
                    <Route path='Modify' element={<ProtectedRoute Component={Modify}/>} />     
                    <Route  path='*' element={<PageNotFound/>}/>
              </Route>

              <Route  path='customer'  element={
                    <Suspense  fallback={<div className='container'>Loading...</div>}>
                      <Customer/>
                    </Suspense> } >

                    <Route path='UpdateProfile' element={<ProtectedRoute Component={UpdateProfile}/>} />
                    <Route  path='*' element={<PageNotFound/>}/>
              </Route>

           <Route  path='*' element={<PageNotFound/>}/>
            
          </Routes>
          <Outlet/>
          {/* <Suspense fallback={<div className='container'>Loading...</div>}>
          {user.UserType === 'Admin' ? <Admin/> : <Customer/>}       
          </Suspense> */}


      </BrowserRouter>
    </>
  );
}

export default App;