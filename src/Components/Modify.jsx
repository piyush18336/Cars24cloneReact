import React from 'react'
import { useState ,useEffect } from 'react'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Modify = () => {

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

const fetchData = (carId) => {
  fetch(`http://localhost:3000/Cars/${carId}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
    setFormData(data)
    });
};


const navigate = useNavigate();

useEffect(() => {
  fetchData(carId);
}, []);

    const [searchParams] = useSearchParams();

    const carId =  (searchParams.get('id'));

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
      axios.put(`http://localhost:3000/Cars/${id}`,{...formData,price:parseInt(formData.price)}).then(function(response){
        console.log(response);
        // alert('Data updated Successfully!');
      }).catch(function (error) {
        console.log(error);
        // alert('Uh! Oh! Some error occured')
      });
        navigate(`/UpdateData`)
     }
      
  return (
    <div className='container'>
        <form >
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

  <button type="submit" className="btn btn-primary" onClick={(e)=>updateData(e,carId)}>Update</button>
    
</form>
    </div>
  )

}

export default Modify
