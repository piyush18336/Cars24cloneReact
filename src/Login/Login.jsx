import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { loginSchema } from '../Components/loginSchema';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '../Home/Home';
import loginContext from '../Context/LoginContext';
import { useContext } from 'react';
import '../Components/UpdateProfile.css'
const Login = ({setLocalUser}) => {

  const isLogin = useContext(loginContext);

  const formInitialValues = {
    Email:'',
    Password: '',
  }

  const[error, setError] = useState('');
  const user = {};
  var Email = '';
  var Password = '';
  const navigate = useNavigate();
  // const getEmail = localStorage.getItem("emailKey");
  // const getPassword = localStorage.getItem("passwordKey");
  
  const formik= useFormik({
    initialValues : formInitialValues,
    validationSchema : loginSchema,
    onSubmit: (values) =>{
      
       axios.get(`http://localhost:3000/Users?Email=${values.Email}&Password=${values.Password}`)
    .then((response)=>{
       Email = response.data[0].Email;
       Password = response.data[0].Password;
       console.log("Email :"+Email+  " Pass : "+Password)  

       if(setLocalUser(localStorage.setItem('user',JSON.stringify(response.data)))){
         isLogin.login = true;
       }
     
        if(Email === formik.values.Email && Password === formik.values.Password){
          setError('');
          navigate(`/`);  
        }else{
          setError('Email and Passwords do not match!');
        }

    }).catch((err)=>{
        console.log(err);
    })  
    },  
  })
    // console.log(formik);
  // const [formErrors,setFormErrors] = useState({});

  // const handleInput = (event)=>{
  //   const name = event.target.name;
  //     const value = event.target.value;
  //     console.log(name,value);

  //     setFormData((prev)=>{
  //         return{...prev,[name]:value}
  //     })
  // }

//   useEffect(()=>{
//     if(formErrors){console.log(formErrors);}
//     if(Object.keys(formErrors).length==0 ){
//         console.log(formData);
//     }
// },[formErrors]);

  // const handleSubmit = (e)=>{
  //   e.preventDefault();
  //   setFormErrors(validate(formData));
  //   axios.get(`http://localhost:3000/Users?Email=${formData.Email}&Password=${formData.Password}`)
  //   .then((response)=>{
  //       if(response.data==null){
  //       }
  //       console.log(response.data);
  //   }).catch((err)=>{
  //       console.log(err);
  //   })
  // }

  // const validate = (values)=>{
  //   const errors = {};
  //   const regex_email = "/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/";
  //   if(!values.Email){
  //     errors.Email = "Email is required";
  //   }else if(regex_email.match(values.Email)){
  //     errors.Email = "This is not a valid email";
  //   }

  //   if(!values.Password){
  //     errors.Password = "password is required";
  //   }else if(values.Password <8){
  //     errors.Password = "Password should be minimum 8 characters";
  //   }
  //   return errors;
  // }

  return (
    <div>
      { user.Email && user.Password ? <Home />: <form className="registration-form" onSubmit={formik.handleSubmit}>
      
      <div className="container">
      <h1>Login</h1>
        <div className="form-container">
        <label className="input-label" htmlFor="email">
            Email
          </label>
          <input
            className='input-text'
            type="email"
            name="Email"
            id="email"
            placeholder="Your Email"
            autoComplete="off"
            value={formik.values.Email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange }
          />
        {formik.errors.Email && formik.touched.Email?(<span className="form-error">{formik.errors.Email}</span>):null}

          <label className="input-label" htmlFor="password">
            Password
          </label>
          <input
            className='input-pass'
            type="password"
            name="Password"
            id="password"
            placeholder="Password"
            autoComplete="off"
            value={formik.values.Password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.Password && formik.touched.Password?(<span className="form-error">{formik.errors.Password}</span>):null}
 
          {error?<span className="form-error">{error}</span>:null}

            <button className="input-button" type="submit">
              Login
            </button>
       
        </div>      
      </div>
    </form> }
     
    </div>
  )
}

export default Login
