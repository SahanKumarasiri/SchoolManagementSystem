import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default class StudentTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    deleteStudent() {
        axios.delete('http://localhost:8070/users/delete/' + this.props.obj._id)
            .then((res) => {
                alert('Student successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
            
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.age}</td>
                <td>{this.props.obj.gender}</td>
                <td>{this.props.obj.birthdate}</td>
                <td><img src ={"images/" + this.props.obj.photo} style={{width:"100px" , height:"100px"}} 
                className = "border border-danger rounded-circle"
                /></td>
                <td style={{width:"250px"}}>
                    <Link className="edit-link" to={`/edit-student/${this.props.obj._id}/${this.props.obj.name}/${this.props.obj.age}/${this.props.obj.gender}/${this.props.obj.birthdate}/${this.props.obj.photo}`}>
                        <Button size="sm" variant="success"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</Button>
                    </Link >
                    
                        <Button size="sm" onClick={() => window.location.reload(true) , this.deleteStudent} variant="danger"><i class="fa fa-window-close" aria-hidden="true" ></i> Delete</Button>
                        <a href="/edit-student"><Button
                        type="submit"  size="sm"
                        className="btn btn-primary"
                        ><i class="fa fa-refresh" aria-hidden="true"></i> Refresh</Button></a>
                    
                </td>
            </tr>
        );
    }
}