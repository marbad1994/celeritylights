import React, { Component } from "react";
import { login } from '../utils';

export default class Login extends Component {
    
    constructor() {
        super()

        this.state = {
            status: null
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const {username, password} = event.target.elements

        console.log(JSON.stringify({username: username.value, password: password.value}))
    
        fetch('https://celerity-backend.herokuapp.com/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }, 
            method: 'POST',
            body: JSON.stringify({username: username.value, password: password.value})
          }).then(res => res.json())
          .then(json => this.handleLogin(json.status))

          
          
    
        event.preventDefault();
    }

    handleLogin = (status) => {
        const { history } = this.props;
        if (status == 200) {
            login()
            history.push("/dashboard")
        } else {
            console.log("Incorrect Password!")
        }
    }

    register = () => {
        const { history } = this.props;
        history.push('/register')

    }

    handleUsernameChange = (event) => {

        this.setState({username: event.target.value});
      }

    handlePasswordChange = (event) => {

        this.setState({password: event.target.value});
    }
    
  


    render() {
        return (
            <div>
            <div className="auth-wrapper" style={{marginTop: 100}}>
            <div className="auth-inner">
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter username" id="username"/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" id="password"/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button value="submit" type="submit" className="btn btn-success btn-block">Submit</button>
                <p className="forgot-password text-right">
                    <a href="/register" onClick={this.register}>Register</a>
                </p>
            </form>
            </div>
            </div>
            </div>
        );
    }
}