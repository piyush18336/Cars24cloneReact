import React from 'react'
import './RangeValues.css'
const YearValues = ({minYear,maxYear,setMinYear,setMaxYear}) => {


    const handleMin = (e)=>{
        const value = e.target.value;
        if(value<=2022){
          setMinYear(value);
        }
        console.log(minYear);
    }

    const handleMax = (e)=>{
      const value = e.target.value;
      if(value<=2022){
        setMaxYear(value);
      }
        console.log(maxYear);
    }
  return (
    <div>
      <div className='rangeValues'>
     <input className='min-price' type="number"  min='2000' max='2022'    value={minYear} onChange={handleMin}/>
     <hr className='seperator'></hr>
     <input className='max-price' type="number"   min='2000' max='2022'    value={maxYear} onChange={handleMax}/> 
    </div>
    </div>
  )
}

export default YearValues
