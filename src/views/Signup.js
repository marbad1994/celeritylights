import React, { Component, setState } from "react";
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import services from '../services';

const { AuthService } = services;

export default class SignUp extends Component {

    constructor() {
        super()
        this.state = {
            alert: false
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const { history } = this.props;
        const {username, password, email, address, firstName, lastName} = event.target.elements
        try {
            await AuthService.login(username.value, password.value, email.value, address.value, firstName.value, lastName.value);
            history.push("/login")
        } catch (ex) {
            this.setState({alert: true})
        }  
        event.preventDefault();
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
            <div className="auth-wrapper" style={{marginTop: 60}}>
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

                <button value="submit" type="submit" className="btn btn-info btn-block">Sign Up</button>
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