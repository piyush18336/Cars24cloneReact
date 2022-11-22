import React from 'react';
import './RangeSlider.css';

const RangeSlider = ( {minValue,maxValue,setMinValue,setMaxValue}) => {

  const minChange=(e)=>{
    console.log(e.target.value);
    setMinValue(e.target.value);
  }

  const maxChange=(e)=>{
    setMaxValue(e.target.value)
  }

return(
 <div className="slider">
  <div className='wrapper'> </div>
  <div className='slider-container'>
    <div className='slider-track'>
    <input type="range" className='range-min' min='20000' max='500000'  onChange={minChange} value={minValue}  />
      <input type="range" className='range-max' min='600000' max='3500000'  value={maxValue} onChange={maxChange} /> 
    </div>
      
  </div>
</div>
)
}
 
export default RangeSlider;