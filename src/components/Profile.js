import React, { Component } from "react";

export default class Login extends Component {
    
    constructor(props) {
        super(props)
        
    }
    

    render() {
        const { history } = this.props;

        return(
            <div>
            <h1>
                Profile
            </h1>
             {localStorage.getItem("loggedIn") ? 
                <h2>Logged In</h2>
                : history.push("/sign-up")
            }
            </div>
        )
    }

}