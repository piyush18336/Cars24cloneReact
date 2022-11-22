import React from 'react'
import './RangeSlider.css'

const KmDriven = ({minKm,maxKm,setMinKm,setMaxKm}) => {
  const minChange=(e)=>{
    console.log(e.target.value);
    setMinKm(e.target.value);
  }

  const maxChange=(e)=>{
    setMaxKm(e.target.value)
  }

return(
 <div className="slider">
  <div className='wrapper'> </div>
  <div className='slider-container'>
    <div className='slider-track'>
    <input type="range" className='range-min' min='0' max='150000'  onChange={minChange} value={minKm}  />
      <input type="range" className='range-max' min='0' max='150000' value={maxKm} onChange={maxChange} /> 
    </div>
      
  </div>
</div>
)
}

export default KmDriven
