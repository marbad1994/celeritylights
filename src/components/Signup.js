import React, { Component, setState } from "react";
import { Link } from "react-router-dom";
import Navbar from './Navbar'
import Alert from 'react-bootstrap/Alert';


export default class SignUp extends Component {

    constructor() {
        super()
        this.state = {
            alert: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const {username, password, email, address, lastName, firstName} = event.target.elements

        console.log(JSON.stringify({username: username.value, password: password.value, email: email.value, address: address.value, firstName: firstName.value, lastName: lastName.value}))
    
        fetch('https://celerity-backend.herokuapp.com/register', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }, 
            method: 'POST',
            body: JSON.stringify({username: username.value, password: password.value, email: email.value, address: address.value, firstName: firstName.value, lastName: lastName.value})
          }).then(res => res.json())
          .then(json => this.handleRegister(json.status))

          
          
    
        event.preventDefault();
    }

    handleRegister = (status) => {
        const { history } = this.props;
        if (status == 200) {
            history.push("/sign-in")
        } else {
            console.log("Incorrect Password!")
            this.setState({alert: true})
        }
    }

    handleUsernameChange = (event) => {

        this.setState({username: event.target.value});
      }

    handlePasswordChange = (event) => {

        this.setState({password: event.target.value});
    }

    handleFirstNameChange = (event) => {

        this.setState({firstName: event.target.value})
    }

    handleLastNameChange = (event) => {

        this.setState({lastName: event.target.value})
    }

    handleEmailChange = (event) => {

        this.setState({email: event.target.value})
    }

    handleAddressChange = (event) => {

        this.setState({address: event.target.value})
    }

    render() {
        return (
            <div>
            <Navbar isLogin={false}/>
            <div className="auth-wrapper" style={{marginTop: 100}}>
            {this.state.alert && <Alert variant="danger">
                    Something went wrong
            </Alert>}
            <div className="auth-inner">
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" id="firstName" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" id="lastName" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" id="email"/>
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input type="text" className="form-control" placeholder="Address" id="address"/>
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Username" id="username"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" id="password"/>
                </div>

                <button value="submit" type="submit" className="btn btn-success btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered? <Link  className="nav-link" to={"/sign-in"}>Sign In</Link>
                </p>
            </form>
            </div>
            </div>
            </div>
        );
    }
}