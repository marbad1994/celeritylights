import React, { Component } from "react";
import { login } from '../utils';
import Alert from 'react-bootstrap/Alert';
import services from '../services';
import { isLogin } from '../utils';

const { AuthService } = services;

export default class Login extends Component {
    
    constructor() {
        super()

        this.state = {
            status: null,
            alert: false
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const {username, password} = event.target.elements
        console.log(username, password)
        const { history } = this.props;
        try {
            const { token } = await AuthService.login(username.value, password.value);
            await login(token);
            if (await isLogin()) {
                history.push("/")
            }
            
          } catch (ex) {
            this.setState({alert: true})
          }
        event.preventDefault();
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
            <div className="auth-wrapper" style={{marginTop: 60}}>
            {this.state.alert && <Alert variant="danger">
                    Incorrect username or password
            </Alert>}

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

                <button value="submit" type="submit" className="btn btn-info btn-block">Submit</button>
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