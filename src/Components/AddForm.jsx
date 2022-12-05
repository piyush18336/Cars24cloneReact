import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import './AddForm.css'
import { useNavigate } from 'react-router-dom';

const AddForm = () => {

    const[formData, setFormData] = useState({
        carName:'',
        image:'',
        price:'',
        model_year:'',
        km_driven:'',
        brand_name: '',
        brand_model:'',
        fuel_type:'',
        owner:'',
    })
    const navigate = useNavigate();
    
    const handleInput = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      console.log(name,value);
      
      setFormData((prev)=>{
        return{...prev,[name]:value}
    })  
}

    const handleFormSubmit = async(event)=>{
      event.preventDefault();
       axios.post("http://localhost:3000/Cars",{...formData,price:parseInt(formData.price)}).then(function (response) {
        console.log(response);
        navigate('/UpdateData');
        // alert('Data Submitted Sucessfully')
      })
      .catch(function (error) {
        console.log(error);
        alert('Uh! Oh! Some error occured')
      });
    }

  return (
    <div className='AddFormcontainer'>
        <form onSubmit={handleFormSubmit}>
  <div className="mb-3">
    <label  className="form-label">Enter Car Name</label>
    <input type="text" className="form-control" name='carName' value={formData.carName}  onChange={handleInput}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Enter Car Price</label>
    <input type="text" className="form-control" name='price' value={formData.price}  onChange={handleInput}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Enter Image URL</label>
    <input type="text" className="form-control" name='image' value={formData.image} onChange={handleInput}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Enter Model Year</label>
    <input type="text" className="form-control" name='model_year' value={formData.model_year} onChange={handleInput}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Enter KM Driven</label>
    <input type="text" className="form-control" name='km_driven' value={formData.km_driven} onChange={handleInput}/>
  </div>
  <div className="mb-3">
    <label className="form-label">Enter Brand Name</label>
    <input type="text" className="form-control" name='brand_name' value={formData.brand_name} onChange={handleInput}/>
  </div>

  <div className="mb-3">
    <label className="form-label">Enter Brand Model</label>
    <input type="text" className="form-control" name='brand_model' value={formData.brand_model} onChange={handleInput}/>
  </div>

  <div className="mb-3">
    <label className="form-label">Enter Fuel Type</label>
    <input type="text" className="form-control" name='fuel_type' value={formData.fuel_type} onChange={handleInput}/>
  </div>

  <div className="mb-3">
    <label className="form-label">Enter Owner's Type</label>
    <input type="text" className="form-control" name='owner' value={formData.owner} onChange={handleInput}/>
  </div>


  <button type="submit" className="btn btn-primary" onClick={handleFormSubmit}>Submit</button>
</form>
    </div>
  )
}

export default AddForm
