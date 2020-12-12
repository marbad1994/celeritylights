import React, { Component } from 'react';
import ProfilePicture from '../me.png';
import services from '../services';
import { getToken } from '../utils';

const { AuthService } = services;

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            address: ""
        }
    }

    componentDidMount = async () => {
        const token = await getToken();
        const { data: { username, firstName, lastName, email, address } } = await AuthService.getProfile(token)
        this.setState({ username: username, firstName: firstName, lastName: lastName, email: email, address: address })
    }

    render() {
        const row = (category, value, capitalize=true) => {
            let cap = "none"
            if (capitalize) {
                cap = "capitalize"
            }
            return (
                <div style={{flexDirection: "row", marginBottom: 10}}>
                <a style={{textTransform: "capitalize", fontSize: 20, fontWeight: "bold", color: "#fff"}}>{category}: </a>
                <a style={{textTransform: cap, fontSize: 20, color: "#fff"}}>{value}</a>
                </div>
            )
        }
        return( <div style={{ marginTop: 100}}>
                <div style={{display: "flex", flexDirection: "row" ,padding: 16, paddingTop: 30, backgroundColor: '#454d55', margin: 20, borderRadius: 10 }}>
                <div>
                {row("Username", this.state.username, false)}
                {row("First Name", this.state.firstName)}
                {row("Last Name", this.state.lastName)}
                {row("Email", this.state.email, false)}
                {row("Address", this.state.address)}
                </div>
                <div>
                <img src={ProfilePicture} style={{width: 150, marginLeft: 200, borderRadius: 75}} />
                </div>
                </div>

                </div>

        )
    }
}


