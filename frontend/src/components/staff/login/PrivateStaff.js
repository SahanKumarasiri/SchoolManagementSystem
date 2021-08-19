import { useState , useEffect } from "react";
import axios from "axios";

const PrivateStaff = ({history})=>{

    useEffect(()=>{
        if(!localStorage.getItem("authTokenStaff")){  //push a user if he already logged in
            history.push("/staff-login");
        }

    } , [history])  //dependency array

    const logoutHandler = ()=>{
        localStorage.removeItem("authTokenStaff");
        history.push("/staff-login");
    }

    return(

            <div style={{backgroundColor:"green" , color : "white"}}>
                <img src="icc.jpg" style={{width:"40px"}}/>
                <button onClick = {logoutHandler} style={{float:"right"}} className="btn btn-warning"><i class="fa fa-reply-all" aria-hidden="true"></i> Logout</button>
                <marquee width="100%" direction="left" >
                <i class="fa fa-heartbeat" aria-hidden="true"></i> Welcome to the Ibbagamuwa Central College
                </marquee>
            </div>

    )

}

export default PrivateStaff;