import React from 'react'
import './RangeValues.css'

const KmDrivenValues = ({minKm,maxKm,setMinKm,setMaxKm}) => {

  const handleMin = (e)=>{
    const value = e.target.value;
    if(value<=150000){
      setMinKm(value);
    }
  }
  
  const handleMax = (e)=>{
    const value = e.target.value;
    if(value<=150000){
      setMaxKm(value);
    }
 }
  
  
  return (
    <div className='rangeValues'>
    <input className='min-price' type="number"  min='0' max='150000'  value={minKm} onChange={handleMin}/>
    <hr className='seperator'></hr>
    <input className='max-price' type="number" min='0' max='150000'  value={maxKm} onChange={handleMax} /> 
   </div>
  )
}

export default KmDrivenValues
