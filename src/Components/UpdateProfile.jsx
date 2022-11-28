import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useEffect,useRef} from "react";
import { profileSchema } from "./ProfileSchema";
import '../Login/SignUp.css'
import { Toast } from "primereact/toast";


const UpdateProfile = () => {
 
  const [formData , setformData] =  useState({});

  const data = JSON.parse(localStorage.getItem('user'));
  const userid = data[0].id;
 

  const fetchData = (UserId) => {
    fetch(`http://localhost:3000/Users/${UserId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
      setformData(data);
      });
     
  };

  // console.log("form data",formData);
    
  useEffect(()=>{
    fetchData(userid);
  },[])
      


  const updateProfile = (values,id)=>{
    axios.put(`http://localhost:3000/Users/${id}`,values).then(function(response){
          }).catch(function (error) {
            console.log(error);
            // alert('Uh! Oh! Some error occured')
          });
 
          fetchData();   
  }

  

  const formik = useFormik({
    initialValues: formData,
    validationSchema: profileSchema,
    onSubmit :(values)=>{
        updateProfile(values,userid);
    },
    enableReinitialize  : true
  });

//   const handleInput = (event)=>{
//     const name = event.target.name;
//     const value = event.target.value;
//     console.log(name,value);
    
//     setFormData((prev)=>{
//       return{...prev,[name]:value}
//   })
//   }

  return (
    <>
    <form className="registration-form" onSubmit={formik.handleSubmit}>
     
     <div className="SignUpContainer">
       <div className="SignUpform-container">
       <h1>Update User Profile</h1>
         <label className="input-label" htmlFor="name">
           Name
         </label>
         <input
           className="input-text"
           type="text"
           name="Name"
           id="name"
           placeholder="Your Name"
           autoComplete="off"
           onBlur={formik.handleBlur}
           value={formik.values.Name}
           onChange={formik.handleChange}
         />
 
 {formik.errors.Name && formik.touched.Name?(<span className="form-error">{formik.errors.Name}</span>):null}
 
 
         <label className="input-label" htmlFor="email">
           Email
         </label>
         <input
           className="input-text"
           type="email"
           name="Email"
           id="email"
           placeholder="Your Email"
           autoComplete="off"
           onBlur={formik.handleBlur}
           value={formik.values.Email}
           onChange={formik.handleChange}
         />
       {formik.errors.Email && formik.touched.Email && (formik.values.Email!=='')?(<span className="form-error">{formik.errors.Email}</span>):null}
 
 
         <label className="input-label" htmlFor="mobile">
           Mobile
         </label>
         <input
          className="input-text"
           type="text"
           name="Mobile"
           id="mobile"
           placeholder="Mobile Number"
           autoComplete="off"
           onBlur={formik.handleBlur}
           value={formik.values.Mobile}
           onChange={formik.handleChange}
         />
         {formik.errors.Mobile && formik.touched.Mobile?(<span className="form-error">{formik.errors.Mobile}</span>):null}
 
 
         <label className="input-label" htmlFor="password">
           Password
         </label>
         <input
         className="input-pass"
           type="password"
           name="Password"
           id="password"
           placeholder="Password"
           autoComplete="off"
           onBlur={formik.handleBlur}
           value={formik.values.Password}
           onChange={formik.handleChange}
         />
        {formik.errors.Password && formik.touched.Password?(<span className="form-error">{formik.errors.Password}</span>):null}
 
         <label className="input-label" htmlFor="confirmPass">
           Confirm Password
         </label>
         <input
         className="input-pass"
           type="password"
           name="confirmPass"
           id="confirmPass"
           placeholder="Confirm Password"
           autoComplete="off"
           onBlur={formik.handleBlur}
           onChange={formik.handleChange}
         />
         {formik.errors.confirmPass && formik.touched.confirmPass?(<span className="form-error">{formik.errors.confirmPass}</span>):null}
 
           <button className="input-button" type="submit">
             Update Profile
           </button>
       </div>
     
       </div>
 
    </form>
    </>
  );
};

export default UpdateProfile;
