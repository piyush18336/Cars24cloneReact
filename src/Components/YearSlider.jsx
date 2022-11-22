import React from 'react'
import './RangeSlider.css'

const YearSlider = ({minYear,maxYear,setMinYear,setMaxYear}) => {
    
    const minChange = (e)=>{
        setMinYear(e.target.value);
        console.log(minYear);
    }

    const maxChange = (e)=>{
        setMaxYear(e.target.value);
        console.log(maxYear);
    }

  return (
    <div className="slider">
  <div className='wrapper'> </div>
  <div className='slider-container'>
    <div className='slider-track'>
    <input type="range" className='range-min' min='2000' max='2022'  onChange={minChange} value={minYear}  />
      <input type="range" className='range-max' min='2000' max='2022'  value={maxYear} onChange={maxChange}/> 
    </div>   
  </div>
</div>
  )
}

export default YearSlider
