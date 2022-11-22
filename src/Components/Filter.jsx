import React from 'react';
import './Filter.css'
import { BiCaretDown } from "react-icons/bi";
import { useState } from 'react';

const Filter = () => {

   const [show, setShow] = useState(false);

  return (
    <div >      
        <input className='search'name="search" placeholder='Search...'></input>
        <div className='filter'>
        <button className="price-button" onClick={()=>{setShow(!show)}}>Price<BiCaretDown className='expand' /></button>
       {
        show?<div className='price-filter'>
          <button className='set-price'>set price</button>
        </div>:null
       }
        <button className="model-year-button" onClick={()=>{setShow(!show)}} >Model Year<BiCaretDown className='expand'/></button>

        {
        show?<div className='model-year-filter'>
        </div>:null
        }
        
        <button className="km-driven-button" onClick={()=>{setShow(!show)}}>Km Driven<BiCaretDown className='expand'/></button>

        {
        show?<div className='km-driven-filter'>
        </div>:null
        }  

        <button className="make-model-button" onClick={()=>{setShow(!show)}}>Make & Model<BiCaretDown className='expand'/></button>
        {
        show?<div className='make-model-filter'>
        </div>:null
        } 

        <button className="RTO-button" onClick={()=>{setShow(!show)}}>RTO<BiCaretDown className='expand'/></button>
        {
        show?<div className='RTO-filter'>
        </div>:null
        } 

        <button className="More-filters-button" onClick={()=>{setShow(!show)}}>More Filters<BiCaretDown className='expand'/></button>
        {
        show?<div className='More-filters-filter'>
        </div>:null
        } 
        </div>   
    </div>
  )

}

export default Filter;
