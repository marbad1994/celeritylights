import React, { Component, setState } from "react";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Navbar from 'react-bootstrap/Navbar'
import GraphModal from "../components/GraphModal";
import { getToken } from '../utils';
import services from '../services';

const { AuthService } = services;

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

    componentDidMount = async () => {
        const token = await getToken();
        const { data } = await AuthService.getStats(token)
        this.setState({ data: data })
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
        this.setState({ programs: l })

    }

    getRandomRounds = () => {
        let l = []
        for (var key in this.state.data) {
            let rounds = this.state.data[key]["rounds"]
            if (!l.includes(rounds) && this.state.data[key]["program"] == "random") {
                l.push(rounds)
            }
        }
        this.setState({ randomRounds: l.sort() })
    }

    showStats = (program) => {
        this.setState({ program: program, rounds: 0 })
        if (program == "sprint") {
            this.showSprintStats()
        }
    }

    showSprintStats = () => {
        let l = []
        let index = 1
        for (var key in this.state.data) {
            let data = this.state.data[key]
            if (data["program"] == "sprint") {
                l.push([data["set"], data["totalTime"], index, data["date"]])
                index++
            }
        }
        this.setState({ table: l })
    }

    showRounds = (rounds) => {
        this.setState({ rounds: rounds })
        let l = []
        let index = 1
        for (var key in this.state.data) {
            let data = this.state.data[key]
            if (data["rounds"] == rounds && data["program"] == "random") {
                l.push([data["set"], data["totalTime"], index, data["date"]])
                index++
            }
        }
        this.setState({ table: l })
    }

    sortTable = (value) => {
        let index = 0
        switch (value) {
            case "Index":
                index = 0;
                break;
            case "Total Time":
                index = 1;
                break;
            case "Date":
                index = 2;
                break;
            default:
                index = 0;
                break;
        }
        this.setState({ sort: !this.state.sort })
        if (this.state.sort) {
            this.state.table.sort(function (a, b) { return a[index] > b[index]; });
        } else {
            this.state.table.sort(function (a, b) { return a[index] < b[index]; });
        }
    }

    render() {
        return (

            <div >


                <Navbar style={{backgroundColor: "#121212"}} variant="dark">
                    <Navbar.Brand>

                        Programs
                        </Navbar.Brand>
                </Navbar>

                <Nav variant="tabs" style={{backgroundColor: "#171717"}}>
                    {this.state.programs.map((value, index) => {
                        return (
                            <Nav.Item key={index}>
                                <Nav.Link className={"menu-item"} style={{ textTransform: "capitalize" }} onClick={() => this.showStats(value)} key={index}>{value}</Nav.Link>
                            </Nav.Item>
                        )
                    })}
                </Nav>

                {this.state.program == "random" ?
                    <>                    <Navbar variant="dark" style={{ height: 40, backgroundColor: "#1E1E1E" }}>>
                        <Navbar.Brand>Rounds</Navbar.Brand>
                    </Navbar>
                        <Nav variant="tabs" style={{backgroundColor: "#252526" }}>
                            {this.state.randomRounds.map((value, index) => {
                                return (
                                    <Nav.Item key={index}>
                                        <Nav.Link className={"menu-item"} onClick={() => this.showRounds(value)} key={index}>{value}</Nav.Link>
                                    </Nav.Item>
                                )
                            })}
                        </Nav> </> : <></>}



                {this.state.program == "random" && this.state.rounds != 0 ?
                    <Table striped bordered hover variant="dark">
                        <thead style={{backgroundColor: "#171717"}}>
                            <tr>
                            <th><Nav.Link className={"menu-item"} style={{ textTransform: "capitalize", fontSize: 20}} onClick={() => this.sortTable("Index")}>Index</Nav.Link></th>
                            <th><Nav.Link className={"menu-item"} style={{ textTransform: "capitalize", fontSize: 20}} onClick={() => this.sortTable("Total Time")}>Total Time</Nav.Link></th>
                            <th><Nav.Link className={"menu-item"} style={{ textTransform: "capitalize", fontSize: 20}} onClick={() => this.sortTable("Date")}>Date</Nav.Link></th>
                            <th><Nav.Link className={"menu-item"} style={{ textTransform: "capitalize", fontSize: 20}} onClick={() => this.sortTable("Index")}>Graph</Nav.Link></th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.table.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{value[2]}</td>
                                        <td>{value[1]} sec</td>
                                        <td>{value[3]}</td>
                                        <td><GraphModal data={value[0]} /></td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    :
                    <></>}

                {this.state.program == "sprint" ?
                    <Table striped bordered hover variant="dark">
                        <thead style={{backgroundColor: "#171717"}}>
                            <tr>
                            <th><Nav.Link className={"menu-item"} style={{ textTransform: "capitalize", fontSize: 20}} onClick={() => this.sortTable("Index")}>Index</Nav.Link></th>
                            <th><Nav.Link className={"menu-item"} style={{ textTransform: "capitalize", fontSize: 20}} onClick={() => this.sortTable("Total Time")}>Total Time</Nav.Link></th>
                            <th><Nav.Link className={"menu-item"} style={{ textTransform: "capitalize", fontSize: 20}} onClick={() => this.sortTable("Index")}>Date</Nav.Link></th>
                            </tr>
                        </thead>
                        <tbody>



                            {this.state.table.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{value[2]}</td>
                                        <td>{value[1]} sec</td>
                                        <td>{value[3]}</td>
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