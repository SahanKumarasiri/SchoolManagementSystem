import React from "react";
import {BrowserRouter as Router , Route , Switch} from "react-router-dom";

import PrivateStaffRoute from "./components/routes/PrivateStaffRoute";

import Header from "./components/staff/Header";
import AddStudent from "./components/staff/AddStudent";
import Home from "./components/staff/Home";
import Footer from "./components/staff/Footer";
import DisplayStudents from "./components/staff/DisplayStudents"
import SocialMedia from "./components/staff/SocialMedia";
import List from "./components/staff/List"
import Edit from "./components/staff/Edit";
import Login from "./components/staff/login/Login";
import PrivateStaff from "./components/staff/login/PrivateStaff";

//user section
import PrivateRoute from "./components/routes/PrivateRoute";


import LoginScreen from "./components/screens/Login";
import RegisterScreen from "./components/screens/Register";
import ForgotPasswordScreen from "./components/screens/ForgotPassword";
import ResetPasswordScreen from "./components/screens/ResetPassword";
import PrivateScreen from "./components/screens/Private";

export default function App() {
  return (
  
    <Router>
          <div>
            
            <Switch>
                <PrivateRoute path = "/" exact component = {PrivateScreen} />
                <Route path="/login" exact component = {LoginScreen} />
                <Route path="/register" exact component = {RegisterScreen} />
                <Route path="/forgotpassword" exact component = {ForgotPasswordScreen} />
                <Route path="/passwordreset/:resetToken" exact component = {ResetPasswordScreen} />
               

            </Switch>


            

            <SocialMedia />
            <Route path="/staff-login" exact component={Login} />
            <PrivateStaffRoute path = "/staff" exact component = {Header} /> 
            <PrivateStaffRoute path = "/staff" exact component = {PrivateStaff} /> 
            <PrivateStaffRoute path = "/staff" exact component = {Home} /> 
            <PrivateStaffRoute path = "/add" exact component = {AddStudent} /> 
            <PrivateStaffRoute path = "/display" exact component = {DisplayStudents} /> 
            <PrivateStaffRoute path = "/edit-student" exact component = {List} /> 
            <PrivateStaffRoute path = "/edit-student/:id/:name/:age/:gender/:birthdate/:photo" exact component = {Edit} /> 

            <Footer/>
            
          </div>

    </Router>

  
  );
}


