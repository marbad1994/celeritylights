import React, { Component } from 'react';
import ProfilePicture from '../me.png';




export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    componentDidMount = async() => {
        await fetch('https://celerity-backend.herokuapp.com/profile-data', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, 
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify({username: "marbad"})
      }).then(res => res.json())
      .then(json => this.setState({data: json.data}))

      console.log(this.state.data)
        
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
                {/* <div style={{alignContent: "center", alignItems:"center", margin: 80}}>
                </div> */}
                <div style={{flex: 1,flexDirection: "column",padding: 16, paddingTop: 30, backgroundColor: '#454d55', margin: 20, borderRadius: 10 }}>
                <div>
                {row("Username", this.state.data["username"])}
                {row("First Name", this.state.data["firstName"])}
                {row("Last Name", this.state.data["lastName"])}
                {row("Email", this.state.data["email"], false)}
                {row("Address", this.state.data["address"])}
                </div>
                <div>
                {/* <img style={{width: 200, height: 200, resizeMode: "cover", borderRadius: 100 }} source={ProfilePicture}/> */}
                <img src={ProfilePicture} style={{width: 150}} />
                </div>
                </div>

                </div>

        )
    }
}


