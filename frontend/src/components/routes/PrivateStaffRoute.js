import {Redirect , Route} from "react-router-dom";

const PrivateStaffRoute = ({component : Component , ...rest})=>{
    return(
        <Route 
            {...rest}
            render = {(props) =>
                localStorage.getItem("authTokenStaff") ? (
                    <Component {...props} />
                ) : (
                    <Redirect to = "/staff-login" />
                )
            }
        />
    )
}

export default PrivateStaffRoute;