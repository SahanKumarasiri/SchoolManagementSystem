import {useState , useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "./Login.css";

const LoginScreen = ({history})=>{

    const [password , setPassword] = useState("");
    const [email , setEmail] = useState("");
    const [error , setError] = useState("");

    useEffect(()=>{
        if(localStorage.getItem("authToken")){  //push a user if he already logged in
            history.push("/");
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
            const {data} = await axios.post("http://localhost:8070/api/auth/login" , {email , password} , config);

            localStorage.setItem("authToken" , data.token);

            history.push("/");

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
        <div className=" bg0">
            <button className="btn btn-danger" ><i class="fa fa-user-circle" aria-hidden="true"></i> <Link to="/staff-login" style={{textDecoration:"none" , color:"white"}}>Staff</Link>
            </button>
            <marquee width="10%" direction="left" >
            <i class="fa fa-hand-o-left" aria-hidden="true"></i> If you are a staff member please login here
            </marquee>
            
           <div className="login-form  bg-dark d-inline-block" >
           <form onSubmit={loginHandler} >
                <img src={"icc.jpg"} style={{width:"100px"}} />
                <h2 className="text-center"><mark>Log in</mark> <i class="fa fa-grav" aria-hidden="true"></i></h2>   
                {error && <span className="badge bg-warning">{error}</span>}     
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="📧 Email" required="required" 
                    value = {email} onChange = {(e)=>setEmail(e.target.value)}
                    />
                </div><br/>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="🔐 Password" required="required" id="myInput"
                    value = {password} onChange = {(e)=>setPassword(e.target.value)}
                    />
                    <label className="float-left form-check-label"><input type="checkbox" onClick={showPassword} /> Show Password</label>
                </div><br/>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block"><i class="fa fa-leaf" aria-hidden="true"></i> Log in</button>
                </div><br/>
                <div className="clearfix">
                    <label className="float-left form-check-label"><input type="checkbox" /> Remember me <i class="fa fa-rss" aria-hidden="true"></i></label><br/>
                    <Link to="/forgotpassword" className="float-right" style={{textDecoration:"none"}}><b> Forgot Password 🥺?</b></Link>
                </div>        
            </form>
            <p className="text-center"><Link to="/register" style={{textDecoration : "none"}}><h5><i class="fa fa-cogs" aria-hidden="true"></i> Create an Account</h5></Link></p>
           </div>
        </div>
    )
}

export default LoginScreen;