import React from 'react'
import { useState ,useEffect } from 'react'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const EditUser = () => {

  const[formData, setFormData] = useState({
    Name:'',
    Email:'',
    Mobile:'',
    UserType:'',
    Password:'',
})
const [searchParams] = useSearchParams();

const UserId =  (searchParams.get('id'));

const fetchData = (UserId) => {
  fetch(`http://localhost:3000/Users/${UserId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
    setFormData(data);
    });
};

const navigate = useNavigate();
useEffect(() => {
  fetchData(UserId);
}, []);

      const handleInput = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      console.log(name,value);
      
      setFormData((prev)=>{
        return{...prev,[name]:value}
    })
    } 
    console.log(formData);

    //PUT REQUEST TO BE MADE HERE IN THIS METHOD

     const updateData = async(e,id)=>{
      e.preventDefault();
      axios.put(`http://localhost:3000/Users/${id}`,formData).then(function(response){
        console.log(response);
        // alert('Data updated Successfully!');
      }).catch(function (error) {
        console.log(error);
        // alert('Uh! Oh! Some error occured')
      });
        navigate(`/UpdateUser`);
     }
      
  return (
    <div className='container'>
        <form >
        <div className="mb-3">
    <label  className="form-label">Enter User Name</label>
    <input type="text" className="form-control" name='Name' value={formData.Name}  onChange={handleInput}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Enter User Mobile</label>
    <input type="text" className="form-control" name='Mobile' value={formData.Mobile}  onChange={handleInput}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Enter User Email </label>
    <input type="text" className="form-control" name='Email' value={formData.Email} onChange={handleInput}/>
  </div>
  <div className='mb-3'>
  <label className="form-label">Select User type </label>
  <div className='mb-3'>
  <select  name='UserType' value={formData.UserType} onChange={handleInput}>
      <option>Admin</option>
      <option>Customer</option>
  </select>
  </div>

  </div>
  <div className="mb-3">
    <label className="form-label">Enter Password </label>
    <input type="text" className="form-control" name='Password' value={formData.Password} onChange={handleInput}/>
  </div>

  <button type="submit" className="btn btn-primary" onClick={(e)=>updateData(e,UserId)}>Update</button>
</form>
    </div>
  )

}

export default EditUser;
