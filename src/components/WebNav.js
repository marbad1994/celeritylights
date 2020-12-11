import React from 'react';
import { logout, isLogin } from '../utils';
import logo from '../logo.png';
import ProfilePicture from '../me.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class WebNav extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLogout =  () => {
        logout()
    }

    render() {
        const isLoggedIn = isLogin()
        return (
            <Navbar collapseOnSelect expand="lg" style={{backgroundColor: "#000"}} variant="dark" sticky="top">
              <Navbar.Brand href="/" ><img alt="Celerity" src={logo} style={{ width: 150 }} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                
                <Nav className="mr-auto">
                {isLoggedIn && <>
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/statitics">Statistics</Nav.Link>
                    </>}
                </Nav>
                <Nav>
                {isLoggedIn ? 
                <>
                <Nav.Link style={{marginTop: "auto", marginBottom: "auto"}} onClick={this.handleLogout} href="/sign-in">Logout</Nav.Link>
                <Nav.Link href="/profile"><img alt="Profile" src={ProfilePicture} style={{width: 40, height: 40, borderRadius: 20}} /></Nav.Link>
                </>
                :
                <>
                     
                <Nav.Link style={{ marginRight: 7}} className="btn btn-outline-info" href="/sign-up">Sign up</Nav.Link>
                <Nav.Link style={{ textColor: "#fff"}} className="btn btn-info" href="/sign-in">Sign in</Nav.Link>
                </>
                }

                </Nav>

                </Navbar.Collapse>

            </Navbar>

        )
    }


}