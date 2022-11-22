import loginContext from "./LoginContext";

import React from 'react'
import { useState } from "react";

const LoginState = (props) => {

    const state = {
         isLoggedIn: false
    }

    const [login,setLogin] = useState(state);

    const loginFunc = ()=>{
        setLogin(true);
    }

    const logoutFunc = ()=>{
        setLogin(false);
    }
  return (
    <loginContext.Provider value={login} >
        {props.children}
    </loginContext.Provider>
  )
}

export default LoginState
