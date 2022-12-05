import React from 'react'
import { useState ,useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateUser.css';
import axios from "axios";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import {Pagination} from 'antd';


const UpdateUser = () => {

  const [total,setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);   

const [data, setData] = useState([]);
const [visible, setVisible] = useState(false);
const [searchData , setSearchData] = useState([]);
const toast = useRef(null);

const accept = (id) => {
    axios
      .delete(`http://localhost:3000/Users/${id}`)
      .then((res) => {
        fetchData();
        console.log(`Data deleted of ID:${id}`);
      })
      .catch((err) => console.log(err));   
  };

const handleSearch = async (e)=>{
        e.preventDefault();
        const value = e.target.value;
        setSearchData(value);
        return await axios.get(`http://localhost:3000/Users?q=${value}`)
        .then((response)=>{
            if(response.data==null){
               return <h4>No data found</h4>
            }
            setData(response.data);
        }).catch((err)=>{
            console.log(err);
        })
}

// const showSuccess = () => {
//     toast.current.show({
//       severity: "success",
//       summary: "Data Updated Successfully!!",
//       detail: "Data fetched successfully",     
//     });
//   };

  const confirm2 = (id) => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => accept(id),
    });
  };


  const fetchData = () => {
    fetch("http://localhost:3000/Users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        setTotal(data.length);
        setData(data);
      });
    // showSuccess();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  const addForm = () => {
    navigate("/admin/AddUser");
  };

  const modify = (id) => {
    navigate(`/admin/EditUser?id=${id}`);
  };

   // *******************PAGINATION*****************************


   const indexOfLastPage = page * postPerPage;
   const indexOfFirstPage = indexOfLastPage - postPerPage;
   const currentPosts = data.slice(indexOfFirstPage,indexOfLastPage);
 
   console.log("indexOfFirstPage",indexOfFirstPage)
   console.log("indexOfLastPage",indexOfLastPage)
   console.log("currentPosts",currentPosts);
   console.log("page",page);
 
   const onShowSizeChange = (current,pageSize)=>{
       console.log("page size",pageSize)
    setPostPerPage(pageSize);
   }
 
 
 
   const itemRender = (current,type,originalElement)=>{
       if(type=="prev"){
           return<a>Previous</a>
       }
       if(type == "next"){
           return <a>Next</a>
       }
 
       return originalElement;
   }
   // ****************************************************

  return (
    <>
    <Toast ref={toast} position="bottom-left" />

    <ConfirmDialog />
    <ConfirmDialog
    visible={visible}
    onHide={() => setVisible(false)}
    message="Are you sure you want to proceed?"
    header="Confirmation"
    icon="pi pi-exclamation-triangle"
    accept={accept}
    />

     <div className='UpdateUserContainer'>
     <div className='Searchcontainer'>
     <input className='listSearch' name="search" placeholder='Search...' value={searchData} onChange={(e)=>{handleSearch(e)}}></input>
      <div className="add-button">
        
          <button className="add-data btn btn-success" onClick={addForm}>
            Add User
          </button>
        </div>
      </div>

      <table className="table">
  <thead className='table-dark'>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Mobile</th>
      <th scope="col">User Image</th>
      <th scope="col">User Type</th>
      <th scope="col">Password</th>
      <th scope="col">Delete</th>
      <th scope="col">Edit</th>
    </tr>
  </thead>
  <tbody>
    
    {currentPosts.map((user,index)=>(
      <tr key={index}>
        <th scope="row">{user.id}</th>
        <td>{user.Name}</td>
        <td>{user.Email}</td>
        <td>{user.Mobile}</td>
        <td>{user.Image}</td>
        <td>{user.UserType}</td>
        <td>{user.Password}</td>
        <td><button
              className="modify-button btn btn-danger"
              onClick={() => {
                confirm2(user.id);
              }}
            >
              Delete
            </button>
            </td>
      <td><button
              className="modify-button  btn btn-primary"
              onClick={() => {
                modify(user.id);
              }}
            >
              Edit
            </button>
      </td>
      </tr>
    ))}
  </tbody>
      </table>

      <div className='pagination'>
                <Pagination
                pageSize={postPerPage}
                total={total}
                current={page}
                onChange={(value)=>{setPage(value)}}
                showSizeChanger
                showQuickJumper
                onShowSizeChange={onShowSizeChange}
                itemRender={itemRender}
                />
            </div>

     </div>
    </>
  )
}

export default UpdateUser
