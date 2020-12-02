import React, { Component, setState } from "react";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import GraphModal from "./GraphModal";

export default class Stats extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            program: "",
            rounds: 0,
            programs: [],
            randomRounds: [],
            sprintStats: {},
            data: {},
            table: [],
            sort: true
        }
        
    }

    componentDidMount = async() => {
        await fetch('https://celerity-backend.herokuapp.com/stats', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, 
        method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify({username: "marbad1994"})
      }).then(res => res.json())
      .then(json => this.setState({data: json.data}))

      console.log(this.state.data)
      this.getPrograms()
      this.getRandomRounds()
        
    }


    getPrograms = () => {
        let l = []
        for (var key in this.state.data) {
            let program = this.state.data[key]["program"]
            if (!l.includes(program)) {
                l.push(program)
            }
        }
        console.log(l)
        this.setState({programs: l})

    }

    getRandomRounds = () => {
        let l = []
        for (var key in this.state.data) {
            let rounds = this.state.data[key]["rounds"]
            if (!l.includes(rounds)) {
                l.push(rounds)
            }
        }
        console.log(l)
        this.setState({randomRounds: l.sort()})
    }

    showStats = (program) => {
        this.setState({program: program, rounds: 0})
    }

    showRounds = (rounds) => {
        this.setState({rounds: rounds})
        let l = []
        let index = 1
        for (var key in this.state.data) {
            let data = this.state.data[key]
            if (data["rounds"] == rounds) {
                console.log(data["date"])
                console.log(data)
                l.push([data["set"], data["totalTime"], index, data["date"]])
                index++
            }
        }
        console.log(l)
        this.setState({table: l})
    }

    sortTime = () => {
        this.setState({sort: !this.state.sort})
        if (this.state.sort) {
            this.state.table.sort(function(a,b){return a[1] > b[1];}); 
        } else {
            this.state.table.sort(function(a,b){return a[1] < b[1];}); 

        }
        this.forceUpdate()
    }

    sortIndex = () => {
        this.setState({sort: !this.state.sort})
        if (this.state.sort) {
            this.state.table.sort(function(a,b){return a[2] > b[2];}); 
        } else {
            this.state.table.sort(function(a,b){return a[2] < b[2];}); 

        }
        this.forceUpdate()
    }

    sortDate = () => {
        this.setState({sort: !this.state.sort})
        if (this.state.sort) {
            this.state.table.sort(function(a,b){return a[3] > b[3];}); 
        } else {
            this.state.table.sort(function(a,b){return a[3] < b[3];}); 

        }
        this.forceUpdate()
    }

    render() {



        return(

            
            <div style={{marginTop:60, backgroundColor: "gray"}}>
            <h1>Program</h1>

            <Nav variant="tabs" defaultActiveKey="/home" style={{backgroundColor: "#000", borderWidth: 1, borderColor: "gray", borderRadius: 10}}>
            {this.state.programs.map((value, index) => {
                return (
                    <Nav.Item>
                    <Nav.Link style={{color: "green", textTransform: "capitalize"}} onClick={() => this.showStats(value)} key={index}>{value}</Nav.Link>
                </Nav.Item>
                )
            })}
            </Nav>
            
            {this.state.program == "random" ? 
            <><h1>Rounds</h1>
            <Nav variant="tabs" defaultActiveKey="/home" style={{backgroundColor: "#000", borderWidth: 1, borderColor: "gray", borderRadius: 10}}>
            {this.state.randomRounds.map((value, index) => {
                return (
                    <Nav.Item>
                    <Nav.Link style={{color: "green"}} onClick={() => this.showRounds(value)} key={index}>{value}</Nav.Link>
                </Nav.Item>
                )
            })}
            </Nav> </>: <></>}

            {this.state.program == "random" && this.state.rounds != 0? 
                        <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                            <th><Button onClick={this.sortIndex} variant="secondary">Index</Button></th>
                            <th><Button onClick={this.sortTime} variant="secondary">Total Time</Button></th>
                            <th><Button onClick={this.sortIndex} variant="secondary">Date</Button></th>
                            <th><Button onClick={this.sortIndex} variant="secondary">Graph</Button></th>
                            </tr>
                        </thead>
                        <tbody>

                            
                            
                        {this.state.table.map((value, index) => {
                            return(
                                <tr key={index}>
                                    <td>{value[2]}</td>
                                    <td>{value[1]} sec</td>
                                    <td>{value[3]}</td>
                                    <td><GraphModal data={value[0]}/></td>

                                </tr>
                            )
                        })}
                        </tbody>
                        </Table>
                        :
                    <></>}  
            </div>
        )
    }

}