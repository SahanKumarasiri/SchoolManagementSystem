import {useState , useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "./Login.css";

const LoginScreen = ({history})=>{

    const [password , setPassword] = useState("");
    const [email , setEmail] = useState("");
    const [error , setError] = useState("");

    useEffect(()=>{
        if(localStorage.getItem("authTokenStaff")){  //push a user if he already logged in
            history.push("/staff");
        }
    } , [history])

    const loginHandler = async (e)=>{
        e.preventDefault();

        const config = {
            headers : {
                "Content-Type" : "application/json"
            }
        }

        try {
            const {data} = await axios.post("http://localhost:8070/api/auth/staff-login" , {email , password} , config);

            localStorage.setItem("authTokenStaff" , data.token);

            history.push("/staff");

        } catch (error) {
            setError(error.response.data.error);
            setTimeout(()=>{
                setError("");
            } , 5000); //5s
        }
    }

    const  showPassword = () => {
        var x = document.getElementById("myInput");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }

    return(
        <div className="container0">
	
            <h1>Staff Login</h1>
            
            <div className="bird-container bird-container--one">
                <div className="bird bird--one"></div>
            </div>
            
            <div className="bird-container bird-container--two">
                <div className="bird bird--two"></div>
            </div>
            
            <div className="bird-container bird-container--three">
                <div className="bird bird--three"></div>
            </div>
            
            <div className="bird-container bird-container--four">
                <div className="bird bird--four"></div>
	        </div>

            <div className="container1">
			<div className="card-body">
				<form onSubmit={loginHandler}>
                {error && <span className="badge bg-warning">{error}</span>}  
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-envelope-o" aria-hidden="true"></i></span>
                                </div>
                                <input type="email" className="form-control" placeholder="Email" 
                                value = {email} onChange = {(e)=>setEmail(e.target.value)} required/>
                                
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-lock" aria-hidden="true"></i></span>
                                </div>
                                <input type="password" className="form-control" placeholder="Password" id="myInput"
                                 value = {password} onChange = {(e)=>setPassword(e.target.value)} required/><br/>
                               
                            </div><br/>
                            <div className="form-group">
                            <label><input type="checkbox" onClick={showPassword}/>Show Password</label><br/>
                                <button type="submit" value="Login" className="btn btn-primary" ><i class="fa fa-sign-in" aria-hidden="true"></i> Login </button>
                            </div>
                </form>
                    
                
            </div>
        </div>
            
        </div>
    )
}

export default LoginScreen;