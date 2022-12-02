import React from "react";
import { useState, useEffect, useRef } from "react";
import './UpdateUser.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import {Pagination} from 'antd';


const UpdateData = () => {

  const [total,setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [searchData , setSearchData] = useState([]);
  const toast = useRef(null);

  const accept = (id) => {
    axios
      .delete(`http://localhost:3000/Cars/${id}`)
      .then((res) => {
        //   alert("Data successfully deleted!! Refresh the page to get the updated Data");
        fetchData();
      
        console.log(`Data deleted of ID:${id}`);
      })
      .catch((err) => console.log(err));   
  };

  const handleSearch = async (e)=>{
    e.preventDefault();
    const value = e.target.value;
    setSearchData(value);
    return await axios.get(`http://localhost:3000/Cars?q=${value}`)
    .then((response)=>{
        if(response.data==null){
           return <h4>No data found</h4>
        }
        setData(response.data);
    }).catch((err)=>{
        console.log(err);
    })
}

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
    fetch("http://localhost:3000/Cars")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
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
    navigate("/admin/AddForm");
  };

  const modify = (id) => {
    navigate(`/admin/Modify?id=${id}`);
  };

  // const handleDelete = (id)=>{
  //   setId(id);
  //   setPopUp(!popUp);
  // }


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
      if(type==="prev"){
          return<a>Previous</a>
      }
      if(type === "next"){
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
       <div className="UpdateUserContainer">
       <div className='Searchcontainer'>
     <input className='listSearch' name="search" placeholder='Search...' value={searchData} onChange={(e)=>{handleSearch(e)}}></input>
      <div className="add-button">
        
          <button className="add-data btn btn-success" onClick={addForm}>
            Add User
          </button>
        </div>
      </div>
    
            <table class="table">
        <thead>
        <tr >
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Model Year</th>
          <th scope="col">KM Driven</th>
          <th scope="col">Brand Name</th>
          <th scope="col">Brand Model</th>
          <th scope="col">Fuel Type</th>
          <th scope="col">Owner</th>
          <th scope="col">Delete</th>
          <th scope="col">Edit</th>
        </tr>
        </thead>
        <tbody>
        {currentPosts.map((car,index)=>(
          <tr key={index}>
          <th scope="row">{car.id}</th>
          <td>{car.carName}</td>
          <td>{car.price}</td>
          <td>{car.model_year}</td>
          <td>{car.km_driven}</td>
          <td>{car.brand_name}</td>
          <td>{car.brand_model}</td>
          <td>{car.fuel_type}</td>
          <td>{car.owner}</td>
          <td><button
                  className="modify-button btn btn-danger"
                  onClick={() => {
                    confirm2(car.id);
                  }}
                >
                  Delete
                </button>
                </td>
          <td><button
                  className="modify-button  btn btn-primary"
                  onClick={() => {
                    modify(car.id);
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
  );
};

export default UpdateData;
