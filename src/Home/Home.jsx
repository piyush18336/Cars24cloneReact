import React from 'react'
import './Home.css'; 
import { useNavigate } from 'react-router-dom';
import CarItem from '../Components/CarItems';
// import { useContext } from 'react'
// import { AppContext } from '../context'
// import { useGlobalContext } from '../context';

const Home = () => {

const navigate = useNavigate();

console.log(navigate);
  // const name = useContext(AppContext)
  // const name = useGlobalContext();
  return (
    <>
    <div className='carsContainer'>
      <CarItem/>
    </div>
    </>    
  )
}

export default Home
