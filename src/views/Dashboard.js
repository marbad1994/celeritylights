import React, { Component } from "react";
import { AreaChart, XAxis, YAxis, Area, CartesianGrid, Tooltip } from 'recharts';
import Nav from "react-bootstrap/Nav";
import Navbar from 'react-bootstrap/Navbar'
import { getToken } from '../utils';
import services from '../services';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import PieChart2 from '../components/PieChart2';

const { AuthService } = services;

export default class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.dataPoints = []
        this.state = {
            program: "",
            rounds: 0,
            programs: [],
            randomRounds: [],
            sprintStats: {},
            data: {},
            table: [],
            sort: true,
            dataPoints: [],
            bestTime: 0,
            worstTime: 0,
            avgTime: 0,
            pieData: [],
            totalUserRun: 0,
            totalUserTime: 0
        }

    }
    componentDidMount = async () => {
        const token = await getToken();
        const { data } = await AuthService.getStats(token)
        this.setState({ data: data })
        let dataPoints = []
        let pieData = []
        let programDividence = {}
        let time = 0
        let runs = 0
        for (var key in this.state.data) {
            let data = this.state.data[key]
            time += data["totalTime"]
            runs += 1
            if (data["program"] in programDividence) {
                programDividence[data["program"]] += 1
            } else {
                programDividence[data["program"]] = 1
            }
            if ("program" in data){
                if (data["program"] == "random") {
                    dataPoints.push({ date: data["date"], Seconds: data["totalTime"], pv: 1000 })
                }
            }
        }

        for (var key in programDividence) {
            pieData.push({ name: key, value: programDividence[key] })
        }

        this.setState({ dataPoints: dataPoints, pieData: pieData, totalUserTime: time.toFixed(2), totalUserRun: runs })
        this.getPrograms()
        this.getRandomRounds()
        this.setDashData(await dataPoints)

    }

    getRandomRounds = () => {
        let randomRounds = []
        for (var key in this.state.data) {
            let rounds = this.state.data[key]["rounds"]
            if (!randomRounds.includes(rounds) && this.state.data[key]["program"] == "random") {
                randomRounds.push(rounds)
            }
        }
        this.setState({ randomRounds: randomRounds.sort() })
    }

    showStats = (program) => {
        this.setState({ program: program, rounds: 0 })
        if (program == "sprint") {
            this.showSprintStats()
        }
    }

    showSprintStats = () => {
        let dataPoints = []
        for (var key in this.state.data) {
            let data = this.state.data[key]
            if (data["program"] == "sprint") {
                dataPoints.push({ date: data["date"], Seconds: data["totalTime"], pv: 1000 })
            }
        }
        this.setState({ dataPoints: dataPoints })
        this.setDashData(dataPoints);
    }

    showRounds = (rounds) => {
        this.setState({ rounds: rounds })
        let dataPoints = []
        for (var key in this.state.data) {
            let data = this.state.data[key]
            if (data["rounds"] == rounds && data["program"] == "random") {
                dataPoints.push({ date: data["date"], Seconds: data["totalTime"], pv: 1000 })
            }
        }
        this.setState({ dataPoints: dataPoints })
        this.setDashData(dataPoints);
    }

    setDashData = (dataPoints) => {
        let best = 0;
        let worst = 0;
        let avg = 0;
        let sortedDataPoints = [...dataPoints];
        sortedDataPoints.sort(function (a, b) { return a[1] < b[1]; });
        best = sortedDataPoints[sortedDataPoints.length - 1].Seconds
        worst = sortedDataPoints[0].Seconds
        let index = 0
        for (index; index < sortedDataPoints.length; index++) {
            avg += sortedDataPoints[index].Seconds
        }
        avg = (avg / index)
        this.setState({ bestTime: best, worstTime: worst, avgTime: avg })
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
    secondsToString = (seconds) => {
    var numDays = Math.floor(seconds / 86400);
    var numHours = Math.floor((seconds % 86400) / 3600);
    var numMinutes = Math.floor(((seconds % 86400) % 3600) / 60);
    var numSeconds = ((seconds % 86400) % 3600) % 60;
    numDays = numDays.toFixed(0);
    numHours = numHours.toFixed(0);
    numMinutes = numMinutes.toFixed(0);
    numSeconds = numSeconds.toFixed(0);
    if (numMinutes == 0) {
        return numSeconds + "s";
    } else if (numHours == 0) {
        return numMinutes + "m " + numSeconds + "s";
    } else if (numDays == 0) {
        return numHours + "h " + numMinutes + "m " + numSeconds + "s";
    }
    return numDays + "d " + numHours + "h " + numMinutes + "m " + numSeconds + "s";
    }

    render() {
        return (
            <div>
                <Navbar style={{backgroundColor: "#121212"}} variant="dark">
                    <Navbar.Brand>
                        Programs
                    </Navbar.Brand>
                </Navbar>

                <Nav style={{backgroundColor: "#171717"}} variant="tabs" defaultActiveKey="Root">
                    {this.state.programs.map((value, index) => {
                        return (
                            <Nav.Item key={index}>
                                <Nav.Link className={"menu-item"} style={{textTransform: "capitalize" }} onClick={() => this.showStats(value)} evebtKey={index} key={index}>{value}</Nav.Link>
                            </Nav.Item>
                        )
                    })}
                </Nav>
                {this.state.program == "random" ?
                    <>                    <Navbar variant="dark" style={{ height: 40, backgroundColor: "#1E1E1E" }}>
                        <Navbar.Brand>

                            Rounds
                            </Navbar.Brand>
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
                <Container>
                    <Row>
                        <Col style={{ marginLeft: -100 }}>
                            <div style={{ backgroundColor: "#252526", width: 740, height: 400, marginTop: 20, marginLeft: 20, borderRadius: 5 , boxShadow: "1px 1px 5px rgba(0,0,0,0.2)"}}>
                                <AreaChart width={740} height={400} data={this.state.dataPoints}
                                    margin={{ top: 20, left: -20, bottom: 20, right: 20 }}>
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="25%" stopColor="green" stopOpacity={0.9} />
                                            <stop offset="95%" stopColor="green" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="date" domain={['dataMin', 'dataMax']} stroke="#fff" hide={true}/>
                                    <YAxis stroke="#fff" />
                                    <CartesianGrid strokeDasharray="4 4"/>
                                    <Tooltip />
                                    <Area type="monotone" dataKey="Seconds"  stroke="#32383F"  fillOpacity={1} fill="url(#colorUv)" />
                                </AreaChart>
                            </div>

                            <CardGroup style={{ width: 760 }}>
                                <Card
                                    text={'white'}
                                    style={{ width: '18rem', backgroundColor: "green", marginLeft: 20, marginTop: 20, boxShadow: "1px 1px 5px rgba(0,0,0,0.2)" }}
                                    className="mb-2"
                                >
                                    <Card.Body>
                                        <Card.Title>Best Time</Card.Title>
                                        <Card.Text>
                                            <h1 >{this.state.bestTime}s</h1>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                                <Card

                                    text={'white'}
                                    style={{ width: '18rem', backgroundColor: "green", marginLeft: 20, marginTop: 20, boxShadow: "1px 1px 5px rgba(0,0,0,0.2)" }}
                                    className="mb-2"
                                >
                                    <Card.Body>
                                        <Card.Title>Worst Time</Card.Title>
                                        <Card.Text>
                                            <h1 >{this.state.worstTime}s</h1>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card
                                    text={'white'}
                                    style={{ width: '18rem', backgroundColor: "green", marginLeft: 20, marginTop: 20 }}
                                    className="mb-2"
                                >
                                    <Card.Body>
                                        <Card.Title>Average Time</Card.Title>
                                        <Card.Text>
                                            <h1>{this.state.avgTime.toFixed(2)}s</h1>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                        </Col>
                        <Col >
                        <div style={{backgroundColor: "green", height: 555, borderRadius: 5, boxShadow: "1px 1px 5px rgba(0,0,0,0.2)"}}>
                            
                            <PieChart2 data={this.state.pieData}  />
                            <div style={{flexDirection: "column"}}>
                            <div style={{backgroundColor: "#252526", height: 180, width: 170, marginTop: -200, marginLeft: 20, borderRadius: 5, boxShadow: "1px 1px 5px rgba(0,0,0,0.2)"}}>
                            <h5 style={{color: "#fff", margin: 10, textAlign: "center"}}><br/>Total time using Celerity Lights<br/></h5>
                            <h1 style={{color: "#fff", marginTop: 20, textAlign: "center"}}>{this.secondsToString(this.state.totalUserTime)}</h1>
                            </div>
                            <div style={{backgroundColor: "#252526", height: 180, width: 170, marginTop: -190, marginLeft: 230, borderRadius: 5, boxShadow: "1px 1px 5px rgba(0,0,0,0.2)"}}>
                            <h5 style={{color: "#fff", margin: 10, textAlign: "center"}}><br/>Total runs using Celerity Lights</h5>
                            <h1 style={{color: "#fff", marginTop: 20, textAlign: "center"}}>{this.state.totalUserRun}</h1>
                            </div>
                            </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}
