import { useState , useEffect } from "react";
import axios from "axios";

const PrivateScreen = ({history})=>{

    useEffect(()=>{
        if(!localStorage.getItem("authToken")){  //push a user if he already logged in
            history.push("/login");
        }

    } , [history])  //dependency array

    const logoutHandler = ()=>{
        localStorage.removeItem("authToken");
        history.push("/login");
    }

    return(
       
            <div style={{backgroundColor:"green" , color : "white"}}>
                 <button onClick = {logoutHandler} >Logout</button>
            </div>
           

    )

}

export default PrivateScreen;