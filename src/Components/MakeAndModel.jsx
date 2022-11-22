import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./MakeAndModel.css";
import { Accordion, AccordionTab } from "primereact/accordion";
import "bootstrap/dist/css/bootstrap.min.css";

const MakeAndModel = () => {
  const [searchData, setSearchData] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState(false);
  const [modelCheck, setModelCheck] = useState(false);
  const [brand, setBrand] = useState([]);
  const [brandModel,setBrandModel] = useState([]);
  

  const handleBrandCheck = (e) => {  
    setChecked(!checked);
    setModelCheck(!modelCheck);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchData(value);
    return await axios
      .get(`http://localhost:3000/Brand?q=${value}`)
      .then((response) => {
        if (response.data == null) {
          return <p>Not found</p>
        }
        setBrand(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = () => {
    fetch("http://localhost:3000/Brand")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setBrand(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const handleModelCheck = (e) => {
  //   const {name,checked} = e.target;
  //   if(name == brand.brand_name){
  //     let tempData = brand.map((brand)=>{
  //       return {...brand,isChecked:checked};
  //     });
  //     setChecked(tempData);
  //   }
  //   else{
  //     let tempData = brand.map((brand)=>{
  //       brand.brand_model.map((model)=>{
  //         model.name === name? {...model,isChecked:checked}:model
  //       })
  //     })
  //     setBrandModel(tempData)
  //   }
  // };

  return (
    <>
      <div className="make-model-search">
        <input
          className="search"
          name="search"
          placeholder="Search..."
          value={searchData}
          onChange={(e) => {
            handleSearch(e);
          }}
        ></input>
      </div>

      {/* {brand.map((brand)=>{
        console.log(brand.brand_name);
        brand.brand_model.map((brandModel)=>{
            console.log(brandModel)
        })
    })} */}

      <Accordion>
        {brand.map((brand,key) => (
          <AccordionTab header={brand.brand_name}>
            <div className="field-checkbox" key={key}>
              <input
                inputId="binary"
                type="checkbox"
                name={brand.brand_name}
                value={brand.brand_name}
                checked={checked}
                onChange={(e)=>handleBrandCheck(e)}
              />
              <label htmlFor="binary">{brand.brand_name}</label>
            </div>

            {brand.brand_model.map((brandModel) => (
              <div className="field-checkbox">
                <div className="field-checkbox1">
                  <input
                    inputId="binary"
                    type="checkbox"
                    value={brand.brand_model}
                    name={brand.brand_model}
                    checked={modelCheck}
                    // onChange={(e) =>handleModelCheck(e)}
                  />
                  <label htmlFor="binary">{brandModel.name}</label>
                </div>
              </div>
            ))}
          </AccordionTab>
        ))}
      </Accordion>

      <button className="fetch-model-data">Show Result</button>
    </>
  );
};

export default MakeAndModel;
