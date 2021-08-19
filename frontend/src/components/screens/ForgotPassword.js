import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./Forgot.css";

const ForgotPasswordScreen = ()=>{

    const [email , setEmail] = useState("");
    const [error , setError] = useState("");
    const [success , setSuccess] = useState("");

    const forgotPasswordHandler = async (e)=>{
        e.preventDefault();

        const config = {
            headers : {
                "Content-Type" : "application/json"
            }
        }

        try {
            const {data} = await axios.post("http://localhost:8070/api/auth/forgotpassword" , {email} , config);

            setSuccess(data.data);

        } catch (error) {
            setError(error.response.data.error);
            setTimeout(()=>{
                setError("");
            } , 5000); //5s
        }
    }

    return(
        <div className="bg1"> 
            <div class="login-form">
            <form onSubmit={forgotPasswordHandler}>
                <h2 className="text-center">Forgot Password <i class="fa fa-frown-o" aria-hidden="true"></i></h2>      
                {error && <span className="badge bg-warning">{error}</span>} 
                {success && <span className="badge bg-success">{success}</span>} 
                <div className="form-group">
                    <p  style={{color:"red"}}>
                        Please enter the email address you register your account with. 
                        We will send you reset password confirmation to this email. 😍
                    </p>
                    <input type="text" className="form-control" placeholder="📧 Email" required="required" 
                    value = {email} onChange = {(e)=>setEmail(e.target.value)}
                    />
                </div><br/>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block"><i class="fa fa-paper-plane" aria-hidden="true"></i> Send</button>
                    
                </div>
            </form> 
            <Link to = "/login">
                <button type="submit" className="btn btn-primary btn-success" style={{float:"right"}}><i class="fa fa-reply" aria-hidden="true"></i> Back</button>
            </Link>
        </div>
        </div>
    )
}

export default ForgotPasswordScreen;