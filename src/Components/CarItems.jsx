import axios from 'axios';
import React ,{useEffect} from 'react'
import { useState } from 'react';
import { BiCaretDown } from "react-icons/bi";
import './CarItems.css';
import KmDriven from './KmDriven';
import KmDrivenValues from './KmDrivenValues';
import MakeAndModel from './MakeAndModel';
import RangeSlider from './RangeSlider';
import RangeValues from './RangeValues';
import YearSlider from './YearSlider';
import YearValues from './YearValues';



const CarItem = ()=>{
   
    const [Cars,setValues] = useState([]);
    const [actual, setActualValue] = useState([]);
    const [priceRange, setPriceRange] = useState([]);
    const [modelYearRange, setModelYearRange] = useState([]);
    const [showprice, setShowPrice] = useState(false);
    const [showModelYear, setShowModelYear] = useState(false);
    const [kmdriven, setKmDriven] = useState(false);
    const [makeModel, setMakeModel] = useState(false);
    const [RTO, setRTO] = useState(false);
    const [MoreFilter, setMoreFilter] = useState(false);
    const [searchData , setSearchData] = useState([]);
    
    const [minValue,setMinValue] = useState(20000);
    const [maxValue,setMaxValue] = useState(3500000);

    const [minYear, setMinYear] = useState(2000);
    const [maxYear, setMaxYear] = useState(2022);

    const [minKm,setMinKm] = useState(0);
    const [maxKm,setMaxKm] = useState(150000);


    //************DATA SEARCH***************** */
    const handleSearch = async (e)=>{
        e.preventDefault();
        const value = e.target.value;
        setSearchData(value);
        return await axios.get(`http://localhost:3000/Cars?q=${value}`)
        .then((response)=>{
        setValues(response.data);
        }).catch((err)=>{
            console.log(err);
        })
        // console.log(value);  
    }
 //************DATA SEARCH***************** */
 

 //************FILTER USING PRICE**************** */

    const filterUsingPrice = ()=>{
        const updatedItems = Cars.filter((item)=>{
                if(item.price<=500000)
                return item;
        })
        setValues(updatedItems);
        }
//**************************************** */

//***************FILTER USING MODEL YEAR********************** */

const modelyear = modelYearRange.filter((element)=>{
        if(element.model_year>=minYear && element.model_year<=maxYear){
            return element;
        }
})

useEffect(()=>{
    setValues(modelyear);
},[minYear,maxYear]);


//***************FILTER USING MODEL YEAR********************** */


//setting all cars
        const AllData = ()=>{
            setValues(actual);
        }


 //**************************** */
 //setting price range filter       
          const price = priceRange.filter((element)=>{
                if(element.price>=minValue && element.price<=maxValue){
                    return element;
                }   
            })

        useEffect(()=>{
        setValues(price);
        },[minValue,maxValue]);
/******************************** */


/* **************FETCHING DATA*********************** */
    const fetchData = () =>{
        fetch("http://localhost:3000/Cars")
        .then((response)=>{
            return response.json();
        }).then((data)=>{
            // console.log(data);
            setValues(data);
            setActualValue(data);
            setPriceRange(data);  
            setModelYearRange(data);  
        })
    }

    useEffect(()=>{
        fetchData();
    },[])
/* ************************************* */
    return (
        <>   
        <div className='block-1'>      
        <input className='search'name="search" placeholder='Search...' value={searchData} onChange={(e)=>{handleSearch(e)}}></input>

        <div className='filter'>
           
            <div className='price-section'>
            <button className="price-button" onClick={()=>{setShowPrice(!showprice)
            setKmDriven(false)
            setMakeModel(false)
            setRTO(false)
            setMoreFilter(false)
            setShowModelYear(false) }}>Price<BiCaretDown className='expand' /></button>

            {showprice?<div className='price-filter'>
                  <RangeSlider minValue={minValue} maxValue={maxValue} setMinValue={setMinValue} setMaxValue={setMaxValue} 
                 /> 
                 <RangeValues minValue={minValue} maxValue={maxValue}  setMinValue={setMinValue} setMaxValue={setMaxValue} />                
                <hr />
                 <button  className='price-button' onClick={ ()=> {filterUsingPrice()
                setShowPrice(false)}} >Under 5 lakhs</button>

                 <button className='price-button' onClick={()=>{ AllData()
                    setShowPrice(false)
                 }}> All </button>
            </div>:null}
               
            </div>

            <div className='model-year-section'>
                <button className="model-year-button" onClick={()=>{setShowModelYear(!showModelYear)
                setKmDriven(false)
                setShowPrice(false)
                setRTO(false)
                setMakeModel(false)
                setMoreFilter(false)}} >Model Year<BiCaretDown className='expand'/></button>

                    {showModelYear?<div className='model-year-filter'>
                         <YearSlider minYear={minYear} maxYear={maxYear} setMinYear={setMinYear} setMaxYear={setMaxYear}/>
                         <p className='model-lowest-year'>2000</p>
                         <p className='model-highest-year'>2022</p>
                         <br />


                        <div className='input-field'>

                            <div className='input-field-name'>
                            <p className='model-lowest-year'>Min Year</p>
                            <p className='model-highest-year'>Max Year</p>
                            </div>
                     
                       <YearValues minYear={minYear} maxYear={maxYear}  setMinYear={setMinYear} setMaxYear={setMaxYear}/>
                        </div>


                       <p className='model-lowest-year'>Suggestions</p>
                        <hr />
                      <button className='price-button'>2019-2022</button>
                    </div>:null }
                    
            </div>
        
         <div className='kmDriven-section'>
            <button className="km-driven-button" onClick={()=>{setKmDriven(!kmdriven)
            setMakeModel(false)
            setMoreFilter(false)
            setRTO(false)
            setShowModelYear(false)
            setShowPrice(false)}}>Km Driven<BiCaretDown className='expand'/></button>

                        {kmdriven?<div className='model-year-filter'>
                         <KmDriven minKm={minKm} maxKm={maxKm} setMinKm={setMinKm} setMaxKm={setMaxKm}/>
                         <p className='model-lowest-year'>0Km</p>
                         <p className='model-highest-year'>1,50,000Km</p>
                         <br />

                        <div className='input-field'>

                           <div className='input-field-name'>

                           <p className='model-lowest-year'>Min Kilometers</p>
                           <p className='model-highest-year'>Max Kilometers</p>
                           </div>
                      
                          <KmDrivenValues minKm={minKm} maxKm={maxKm} setMinKm={setMinKm} setMaxKm={setMaxKm}/>
                        </div>
                        

                       <p className='model-lowest-year'>Suggestions</p>
                        <hr />
                      <button className='price-button'>Under 40,000 KM</button>
                    </div>:null }   
         </div>
        
            <div className='makeModel-section'>
                <button className="make-model-button" onClick={()=>{setMakeModel(!makeModel)
                setKmDriven(false)
                setMoreFilter(false)
                setRTO(false)
                setShowModelYear(false)
                setShowPrice(false)}}>Make & Model<BiCaretDown className='expand'/></button>
                {
                makeModel?<div className='make-model-filter'>
                    <MakeAndModel/>
                </div>:null
                } 
            </div>
        
            <div className='RTO-section'>
                <button className="RTO-button" onClick={()=>{setRTO(!RTO)
                setKmDriven(false)
                setMakeModel(false)
                setMoreFilter(false)
                setShowModelYear(false)
                setShowPrice(false)}}>RTO<BiCaretDown className='expand'/></button>
                    {
                    RTO?<div className='RTO-filter'>
                    </div>:null
                    }
            </div>
         
            <div className='MoreFilter-Section'>
                <button className="More-filters-button" onClick={()=>{setMoreFilter(!MoreFilter)
                setKmDriven(false)
                setMakeModel(false)
                setRTO(false)
                setShowModelYear(false)
                setShowPrice(false)}}>More Filters<BiCaretDown className='expand'/></button>
                {
                MoreFilter?<div className='More-filters-filter'>
                </div>:null
                }
            </div>
        </div>   

    <div className='block-2'>
        {Cars.map((car,index)=>(
            <div className='cars-card' key={index}>  
            <div className="card" style={{width: "20rem"}}>

            <img src={car.image} className="card-img-top" alt="..." style={{height: "20rem"}}/>
            <div className="card-body"> 
               <p>{car.model_year}</p> <h5 className="card-title">{car.carName}</h5>
               
            <div className='more-info'>
               <div className='small-buttons'>
                    {car.km_driven} Km
                </div>
                <div className='small-buttons'>
                    {car.owner}
                </div>
                <div className='small-buttons'>
                    {car.fuel_type}
                </div>  
            </div>  

               <hr/>    
                <p className="card-price">{car.price} Rs.</p>
            </div>
            </div>            
          </div>    
        ))}
    </div>

        </div>   
        </>         
    )
}


export default CarItem;