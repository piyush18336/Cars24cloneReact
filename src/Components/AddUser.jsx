import React from 'react';
import axios from 'axios';
import './AddForm.css'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { FormSchema } from "../Components/Schema";

const AddUser = () => {

  const formInitialValues = {
    Name:'',
    Email:'',
    Mobile:'',
    Password: '',
    UserType:'',
    confirmPass:''
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

    // const[formData, setFormData] = useState({
    //     Name:'',
    //     Email:'',
    //     Mobile:'',
    //     Type:'',
    //     Password:'',
    //     confirmPass: '',
    // })

    // const[pass_error,setPassError] = useState(false);

    const navigate = useNavigate();

    // const handleInput = (event)=>{
    //   const name = event.target.name;
    //   const value = event.target.value;
    //   console.log(name,value);
      
    //   setFormData((prev)=>{
    //     return{...prev,[name]:value}
    // })
// }

    // const handleFormSubmit = async(event)=>{
    //   event.preventDefault();
    //   if(validate(formData)){
    //     setPassError(true);
    //   }else{ 
    //     axios.post("http://localhost:3000/Users",formData).then(function (response) {
    //       console.log(response.data);
    //     navigate('/UpdateUser'); 
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //     alert('Uh! Oh! Some error occured')
    //   });  
    // }      
    // }  

    // const validate = (value)=>{
    //   if(value.Password!=value.confirmPass){
    //     return true;
    //   }
    //   return false;
    // }

  return (
    <div className='container'>
  <form onSubmit={formik.handleSubmit}>
  <div className="mb-3">
    <label  className="form-label">Enter User Name</label>
    <input type="text" className="form-control" name='Name' value={formik.values.Name}  onChange={formik.handleChange}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Enter User Mobile</label>
    <input type="text" className="form-control" name='Mobile' value={formik.values.Mobile}  onChange={formik.handleChange}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Enter User Email </label>
    <input type="text" className="form-control" name='Email' value={formik.values.Email} onChange={formik.handleChange}/>
  </div>
  <div className='mb-3'>
  <label className="form-label">Select User type </label>
  <div className='mb-3'>
  <select name='UserType' onChange={formik.handleChange}>
      <option>Admin</option>
      <option>Customer</option>
  </select>
  </div>
 
  </div>
  <div className="mb-3">
    <label className="form-label">Enter Password </label>
    <input type="text" className="form-control" name='Password' value={formik.values.Password} onChange={formik.handleChange}/>
  </div>
  
  <div className="mb-3">
    <label className="form-label">Confirm Password</label>
    <input type="text" className="form-control"  name='confirmPass'  onChange={formik.handleChange}/>
  <span className='password-error'>{formik.errors.confirmPass}</span>
  </div>

  <button type="submit" className="btn btn-primary" onClick={formik.handleSubmit}>Submit</button>
</form>
    </div>
  )
}

export default AddUser;
