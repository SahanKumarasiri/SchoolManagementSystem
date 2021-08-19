import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {Link} from "react-router-dom";




export default class Edit extends Component {

  constructor(props) {

    super(props)
    
    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeStudentAge = this.onChangeStudentAge.bind(this);
    this.onChangeStudentGender = this.onChangeStudentGender.bind(this);
    this.onChangeStudentBirthdate = this.onChangeStudentBirthdate.bind(this);
    this.onChangeStudentPhoto = this.onChangeStudentPhoto.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    

    // State
    this.state = {
      name: '',
      age: '',
      gender: '',
      birthdate: '',
      photo:'',
      
    }
  }

  onChangeStudentName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeStudentAge(e) {
    this.setState({ age: e.target.value })
  }

  onChangeStudentGender(e) {
    this.setState({ gender: e.target.value })
  }

  onChangeStudentBirthdate(e) {
    this.setState({ birthdate: e.target.value })
  }

  onChangeStudentPhoto(e) {
    this.setState({ photo: e.target.files[0] })
  }

  onSubmit(e) {
    e.preventDefault()

    const formData = new FormData();
        formData.append('photo', this.state.photo);
        formData.append('birthdate', this.state.birthdate);
        formData.append('name', this.state.name);
        formData.append('age', this.state.age);
        formData.append('gender', this.state.gender);

    axios.put('http://localhost:8070/users/update/' + this.props.match.params.id, formData)
      .then((res) => {
        console.log(res.data)
        alert('Student successfully updated')
      }).catch((error) => {
        console.log(error)
      })
      // Redirect to Student List 
    this.props.history.push('/edit-student')
    
  }


  render() {
    const { name , age , gender , birthdate , photo} = this.props.match.params;
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
                        <Link className="nav-link " to = "/add"><i class="fa fa-user-circle" aria-hidden="true"></i> Create Student</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to = "/display"><i class="fa fa-desktop" aria-hidden="true"></i> Display Students</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link active" to = "#"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit Students</Link>
                      </li>
                    </ul>
                    <form className="d-flex">
                      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{width:"60%"}}/>
                      <button className="btn btn-outline-success" type="submit"><i class="fa fa-fw fa-search"></i>Search</button>
                    </form>
                  </div>
                </div>
              </nav>
             
                <div className="form-wrapper container" style={{width:"50%"}}><br/><br/>
                <h1>Current Info 👁</h1>
                <table>

                    <td controlId="Name">
                    <label>Name</label>
                    <input type="text" value={name} onChange={this.onChangeStudentName} required disabled/>
                    </td>

                    <td controlId="Age">
                    <label>Age</label>
                    <input type="text" value={age} onChange={this.onChangeStudentAge} required disabled/>
                    </td>

                    <td controlId="Gender">
                    <label>Gender</label>
                    <input type="text" value={gender} onChange={this.onChangeStudentGender} required disabled/>
                    </td>

                    <td controlId="Birthdate">
                    <label>Birthdate</label>
                    <input type="text" value={birthdate} onChange={this.onChangeStudentBirthdate} required disabled/>
                    </td>



                </table>
                </div>
                <div className="form-wrapper container" style={{width:"50%"}}><br/><br/>
                <h1>Need to Update ? 🤔</h1>
                <Form onSubmit={this.onSubmit}>
               
                    <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} placeholder="✍🏻 Edit Name" required />
                    </Form.Group>

                    <Form.Group controlId="Age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="text" value={this.state.age} onChange={this.onChangeStudentAge} placeholder="✍🏻 Edit Age" required/>
                    </Form.Group>

                    <Form.Group controlId="Gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control type="text" value={this.state.gender} onChange={this.onChangeStudentGender} placeholder="✍🏻 Edit Gender" required/>
                    </Form.Group>

                    <Form.Group controlId="Birthdate">
                    <Form.Label>Birthdate</Form.Label>
                    <Form.Control type="text" value={this.state.birthdate} onChange={this.onChangeStudentBirthdate} placeholder="✍🏻 Edit Birthday" required/>
                    </Form.Group><br/>

                    <Form.Group controlId="Email">
                    <Form.Label>Photo</Form.Label>
                    <i class="fa fa-folder-open" aria-hidden="true"></i>
                    <input 
                        type="file" 
                        accept=".png, .jpg, .jpeg"
                        name="photo"
                        onChange={this.onChangeStudentPhoto} required
                    />
                   
                    </Form.Group>

                    <br/>
                    <Button variant="danger" size="lg" block="block" type="submit">
                    <i className="fa fa-paper-plane-o" aria-hidden="true"></i> Update Student
                    </Button>
                </Form><br/><br/><br/><br/>
                </div>
             
        </div>
       );
  }

}