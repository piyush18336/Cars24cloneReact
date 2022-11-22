import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const ConfirmationModal = ({id,setData,setShow}) => {
    // const[updatedData, setUpdatedData] = useState(data);
    const[cancel,setCancel] = useState(true);
    const handleCancel = ()=>{
        setCancel(!cancel);
    }

    const fetchData = () => {
        fetch("http://localhost:3000/Cars")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            handleCancel();
            setData(data);
            setShow(true); 
          });
      };

    const navigate = useNavigate();

    const deletePost = (id)=>{
        axios.delete(`http://localhost:3000/Cars/${id}`).then(res=>{
        //   alert("Data successfully deleted!! Refresh the page to get the updated Data");
        fetchData();
          console.log(`Data deleted of ID:${id}`);         
        }).catch(err=>console.log(err));
      }
  return (
    <>
   {cancel? <div className="Confirmation"> 
        <p className="confirm-message">Are you sure you want to delete the data?</p>
        <div className="button-section">
        <button className="cancel" onClick={()=>{handleCancel()}}>Cancel</button>
        <button className="confirm" onClick={()=>deletePost(id)}>Delete</button>
        </div>
    </div>:null}
    </>
    
    
  )
}

export default ConfirmationModal
