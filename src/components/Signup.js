import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from './Navbar'


export default class SignUp extends Component {
    render() {
        return (
            <div>
            <Navbar isLogin={false}/>
            <div className="auth-wrapper" style={{marginTop: 100}}>
            <div className="auth-inner">
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-success btn-block">Sign Up</button>
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