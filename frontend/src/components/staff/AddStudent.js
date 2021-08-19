import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const Image = () => {

    const [loading, setLoading] = useState(false); //additional 
    const [isError, setIsError] = useState(false);


    const [newUser, setNewUser] = useState(
        {
            name: '',
            age : '',
            gender : '',
            birthdate: '',
            photo: '',
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        setIsError(false); //additional


        const formData = new FormData();
        formData.append('photo', newUser.photo);
        formData.append('birthdate', newUser.birthdate);
        formData.append('name', newUser.name);
        formData.append('age', newUser.age);
        formData.append('gender', newUser.gender);

        axios.post('http://localhost:8070/users/add', formData)
             .then(res => {
                console.log(res);
                setLoading(false);
                alert("Image is uploaded successfully")
                setNewUser({name :'' , age : '' , gender : '' , birthdate : '' , photo : ''})
             })
             .catch(err => {
                console.log(err);
                setLoading(false);
                setIsError(true);
                alert(err);
             });
    }

    const handleChange = (e) => {
        setNewUser({...newUser, [e.target.name]: e.target.value});
    }

    const handlePhoto = (e) => {
        setNewUser({...newUser, photo: e.target.files[0]});
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" >
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{color:"red"}}><b>School Management System</b></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav nav-tabs">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to = "/staff"><i class="fa fa-fw fa-home"></i>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to = "/add"><i class="fa fa-user-circle" aria-hidden="true"></i> Create Student</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to = "/display"><i class="fa fa-desktop" aria-hidden="true"></i> Display Students</Link>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{width:"60%"}}/>
              <button className="btn btn-outline-success" type="submit"><i class="fa fa-fw fa-search"></i>Search</button>
            </form>
          </div>
        </div>
      </nav>
        <div className="container" style={{width:"50%"}}><br/><br/>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className="cmb-3">
                <label for="name" className="form-label">Name</label>
                <input 
                    type="text"
                    className="form-control"
                    placeholder="Enter the name"
                    name="name"
                    value={newUser.name}
                    onChange={handleChange} required
                />
                <label for="age" className="form-label">Age</label>
                <input 
                    type="text"
                    placeholder="Enter the age"
                    className="form-control"
                    name="age"
                    value={newUser.age}
                    onChange={handleChange} required
                />
                <label for="gender" className="form-label">Gender</label>
                <input 
                    type="text"
                    placeholder="Enter the gender"
                    className="form-control"
                    name="gender"
                    value={newUser.gender}
                    onChange={handleChange} required
                />  
            </div>
            
            <div className="jumbotron">
                <h1 className="display-4">Upload a Photo of Student</h1>
                <p className="lead">
                Please choose a valid relavant photo 👩‍🎓
                </p>
                <hr className="my-4" />
            </div>
            <i class="fa fa-folder-open" aria-hidden="true"></i>
            <input 
                type="file" 
                accept=".png, .jpg, .jpeg"
                name="photo"
                onChange={handlePhoto} required
            />

            <input 
                type="date"
                name="birthdate"
                value={newUser.date}
                onChange={handleChange} required
            />

            
            <br/>
            <div>
                     {isError && <small className="mt-3 d-inline-block text-danger">Something went wrong. Please try again later.</small>}
                     {/*decision*/}
                     <button
                        type="submit"
                        className="btn btn-primary mt-3"
                        disabled={loading}
                        ><i class="fa fa-upload" aria-hidden="true"></i> {loading ? 'Uploading...' : 'Upload'}
                     </button>
                    
            </div>
        </form>
        <br/>
        <a href="/add"><button
                        type="submit"
                        className="btn btn-success"
                        
                        ><i class="fa fa-refresh" aria-hidden="true"></i> Refresh</button></a>
        <br/><br/><br/><br/><br/><br/>
        </div>
        </div>
        
    );
}

export default Image;