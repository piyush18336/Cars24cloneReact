import React from 'react';
import { useContext,useReducer ,useEffect } from 'react';
import reducer from './reducer';


const API = "http://localhost:3000/Cars";

const initialValues = {
    Cars:[]
}

const AppContext  = React.createContext();

//we need to create a provider function


const AppProvider  = ({children}) =>{


    const [state, dispatch] = useReducer(reducer, initialValues);


    const fetchApiData = async(url)=>{
        try {
           const res = await fetch(url);
           const data = await  res.json();
           console.log(data); 
           dispatch({
            type:"GET_VALUES",
            payload:{
                Cars:data.Cars
            }
           })
        } catch (error) {
            console.log("error");
        }
    }

    // useEffect(()=>{
    //     fetchApiData(`${API}`);
    // },[])

    return <AppContext.Provider value={{...state}}>{children}</AppContext.Provider>
}

//global custom hooks
const useGlobalContext = ()=>{
    return useContext(AppContext);
}

export {AppContext, AppProvider, useGlobalContext};

 