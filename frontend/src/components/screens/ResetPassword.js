import {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "./Reset.css";

const ResetPasswordScreen = ({history , match})=>{

    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const [success , setSuccess] = useState("");
    const [error , setError] = useState("");

    const resetPasswordHandler = async (e)=>{
        e.preventDefault();

        const config = {
            headers : {
                "Content-Type" : "application/json"
            }
        }

        if(password !== confirmPassword){
            setPassword("");
            setConfirmPassword("");
            setTimeout(()=>{
                setError("");
            } , 5000);

            return setError("Password did not match");

        }

        try {
            const {data} = await axios.put(`http://localhost:8070/api/auth/passwordreset/${match.params.resetToken}` , {password} , config);

           setSuccess(data.data);

        } catch (error) {
            setError(error.response.data.error);
            setTimeout(()=>{
                setError("");
            } , 5000); //5s
        }
    }

    return(
        <div className="bg2">
            <div class="login-form">
            <form onSubmit={resetPasswordHandler}>
                <h2 className="text-center">Reset Password <i class="fa fa-retweet" aria-hidden="true"></i></h2>    
                {error && <span className="badge bg-warning">{error}</span>} 
                {success && <span className="badge bg-success" >{success + " "}
                <Link to = "/login" style={{color:"yellow"}} >Login here</Link></span>}    
                <div className="form-group"><br/>
                    <input type="text" className="form-control" placeholder="🔏 New Password" required="required" 
                    value = {password} onChange = {(e)=>setPassword(e.target.value)}
                    />
                </div><br/>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="🔐 Confirm Password" required="required" 
                    value = {confirmPassword} onChange = {(e)=>setConfirmPassword(e.target.value)}
                    />
                </div><br/>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block"><i class="fa fa-cog" aria-hidden="true"></i> Reset</button>
                </div>
            </form>
            <Link to = "/login">
                <button type="submit" className="btn btn-primary btn-success" style={{float:"right"}}><i class="fa fa-reply" aria-hidden="true"></i> Back</button>
            </Link>
            </div>
        </div>
    )
}

export default ResetPasswordScreen;