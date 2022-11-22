import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css';
const PageNotFound = () => {
    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate('/');
    }
  return (
    <div className='page-not-found'>
      <img src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000" alt="" />

      <div>
      <button className='page-not-found-btn' onClick={handleClick}>Back to Home</button>
      </div>
    </div>

    
  )
}

export default PageNotFound;
