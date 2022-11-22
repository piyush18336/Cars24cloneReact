import React from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { FormSchema } from "../Components/Schema";


export default function SignUp() {

  const formInitialValues = {
    Name:'',
    Email:'', 
    Mobile:'',
    Password: '',
    confirmPass:'',
  }

  const formik= useFormik({
    initialValues: formInitialValues,
    validationSchema : FormSchema,
    onSubmit: (values) =>{
      console.log(values);
      axios.post("http://localhost:3000/Users",values).then(function (response) {
                console.log(response);
                navigate('/Login');
                // alert('Data Submitted Sucessfully')
              })
              .catch(function (error) {
                console.log(error);
                alert('Uh! Oh! Some error occured')
              });
    },
    
  })

  // const[formData, setformData] = useState({
  //   Name : "", 
  //   Email: "",
  //   Mobile:"",
  //   Password: "",
  //   confirmPass:"",
  // });
  

  // const [formErrors,setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  // const handleInput = (event)=>{
  //     const name = event.target.name;
  //     const value = event.target.value;
  //     console.log(name,value);

  //     setformData((prev)=>{
  //         return{...prev,[name]:value}
  //     })
  // }

//   useEffect(()=>{
//     if(formErrors){console.log(formErrors);}
//     if(Object.keys(formErrors).length==0 && isSubmit){
//         console.log(formData);
//         axios.post("http://localhost:3000/Users",formData).then(function (response) {
//         console.log(response);
//         navigate('/Login');
//         // alert('Data Submitted Sucessfully')
//       })
//       .catch(function (error) {
//         console.log(error);
//         alert('Uh! Oh! Some error occured')
//       });
//     }
// },[formErrors]);


  // const handleSubmit = (e)=>{
  //   e.preventDefault();
  //   setFormErrors(validate(formData));
  //   setIsSubmit(true);
  // }


  // const validate = (values)=>{
  //   const errors = {};
  //   const regex_name = "/^[a-zA-Z\s]+$/";
  //   const regex_email = "/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/";
  //   const regex_mobile = "^[789]\d{9}$";

  //   if(!values.Name){
  //     errors.Name = "Username is required";
  //   }else if(regex_name.match(values.Name)){
  //     errors.Name = "Invalid Username";
  //   }

  //   if(!values.Email){
  //     errors.Email = "Email is required";
  //   }else if(regex_email.match(values.Email)){
  //     errors.Email = "This is not a valid email";
  //   }

  //   if(!values.Mobile){
  //     errors.Mobile = "Mobile number is required";
  //   }else if(regex_mobile.match(values.Mobile) && values.Mobile.length===10){
  //     errors.Mobile = "This is not a valid mobile number";
  //   }

  //   if(!values.Password){
  //     errors.Password = "password is required";
  //   }else if(values.Password <8){
  //     errors.Password = "Password should be minimum 8 characters";
  //   }

  //   if(!values.confirmPass){
  //     errors.confirmPass = "confirm password is required";
  //   }else if(values.confirmPass!=values.Password){
  //     errors.confirmPass = "Passwords do not match";
  //   }

  //   return errors;

  // }

  return (
    <form className="registration-form" onSubmit={formik.handleSubmit}>
     
      <div className="container">
        <div className="form-container">
        <h1>Sign Up</h1>
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
            value={formik.values.Name}
            onChange={formik.handleChange}
          />

          <span className="form-error">{formik.errors.Name}</span>

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
            value={formik.values.Email}
            onChange={formik.handleChange}
          />
        <span className="form-error">{formik.errors.Email}</span>

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
            value={formik.values.Mobile}
            onChange={formik.handleChange}
          />
          <span className="form-error">{formik.errors.Mobile}</span>

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
            value={formik.values.Password}
            onChange={formik.handleChange}
          />
        <span className="form-error">{formik.errors.Password}</span>
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
            value={formik.values.confirmPass}
            onChange={formik.handleChange}
          />
          <span className="form-error">{formik.errors.confirmPass}</span>

            <button className="input-button" type="submit">
              Register
            </button>
        </div>
      
        </div>
    </form>
  );
}
