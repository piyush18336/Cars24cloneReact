import './App.css';
import NavBar from './Navigation/NavBar';
import React from 'react'
import Home from './Home/Home';
import Login from './Login/Login';
import SignUp from './Login/SignUp';
import { Suspense, useState } from 'react';
import { useEffect } from 'react';
import PageNotFound from './Components/PageNotFound';
import {BrowserRouter , Route , Routes} from 'react-router-dom'


const UpdateProfile = React.lazy(() => import('./Components/UpdateProfile'));
const UpdateData = React.lazy(() => import('./Components/UpdateData'));
const UpdateUser = React.lazy(() => import('./Components/UpdateUser'));
const AddForm = React.lazy(() => import('./Components/AddForm'));
const AddUser = React.lazy(() => import('./Components/AddUser'));
const EditUser = React.lazy(() => import('./Components/EditUser'));
const Modify = React.lazy(() => import('./Components/Modify'));


// const Admin = React.lazy(() =>import('./Users/Admin'));
// const Customer = React.lazy(() =>import('./Users/Customer'));



const App = () => {

  const [user, setUser] = useState({});
  const [localUser, setLocalUser] = useState(false);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('user'));
    if (data) {
      setUser(data[0]);
    }
  }, [localUser]);

  // console.log(user);
  console.log("local User",localUser);
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<div className='container'>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Login' element={<Login setLocalUser={setLocalUser} />} />
            <Route path='/SignUp' element={<SignUp />} />


            {user.UserType === 'Customer' && <Route path="/UpdateProfile" element={<UpdateProfile />} />}

            {user.UserType === 'Admin' && <>
              <Route path='/UpdateData' element={<UpdateData/>} />
              <Route path='/UpdateUser' element={<UpdateUser/>} />
              <Route path='/AddForm' element={<AddForm/>} />
              <Route path='/UpdateProfile' element={<UpdateProfile/>} />
              <Route path='/AddUser' element={<AddUser/>} />
              <Route path='/EditUser' element={<EditUser/>} />
              <Route path='/Modify' element={<Modify/>} />
            </>}

            {/* {user.UserType === 'Customer' && <Customer/>}

            { user.UserType === 'Admin' && <Admin/>} */}

            <Route path='*' element={<PageNotFound />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;