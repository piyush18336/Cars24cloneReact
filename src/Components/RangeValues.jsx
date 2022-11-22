import React from 'react'
import './RangeValues.css';

const RangeValues = ({minValue,maxValue,setMinValue,setMaxValue}) => {

// const[firstVal,setFirstVal] = useState();

// const[seccondVal,setSecondVal] = useState();

const handleMin = (event)=>{
  var value = event.target.value;
  // console.log('Input Val',value);
  // console.log('firstVal',firstVal)
 
  setMinValue(value);
}

const handleMax = (event)=>{
  var value = event.target.value;
  setMaxValue(value);
  // console.log('secVal',seccondVal)
}

  return (
    <div className='rangeValues'>
     <input className='min-price' type="number"  min='20000' max='500000'   placeholder='Min Price' value={minValue} onChange={handleMin}/>
     <hr className='seperator'></hr>
     <input className='max-price' type="number"  min='600000' max='3500000'  placeholder='Max Price' value={maxValue} onChange={handleMax} /> 
    </div>
  )
}

export default RangeValues;
