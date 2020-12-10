import React, { setState } from 'react';
import { Link } from "react-router-dom";
import { logout, isLogin } from '../utils';
import logo from '../logo.png';
import ProfilePicture from '../me.png';

export default class Navbar extends React.Component {

    constructor(props) {
        super(props);

    }


    handleLogout = () => {
        logout()
        this.setState({ isLogin: isLogin() })
    }


    componentDidMount() {
        if (document.cookie.split(';').filter((item) => item.trim().startsWith('isLogin=')).length) {
            this.setState({ loggedIn: true })
        }
        window.setInterval(() => {
            if (document.cookie.split(';').filter((item) => item.trim().startsWith('isLogin=')).length) {
                this.setState({ loggedIn: true })
            }
            else {
                this.setState({ loggedIn: false })
            }
        }, 500)
    }



    render() {
        const isLoggedIn = isLogin()
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link style={{ color: "#fff" }} className="navbar-brand" to={"/sign-in"}><img src={logo} style={{ width: 150 }} /></Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            {!isLoggedIn ? <>
                                <li className="nav-item">
                                    <Link style={{ color: "#fff" }} className="nav-link" to={"/sign-in"}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link style={{ color: "#fff" }} className="nav-link" to={"/sign-up"}>Sign up</Link>
                                </li>
                            </>
                                : <>
                                    <li className="nav-item">
                                        <Link style={{ color: "#fff" }} className="nav-link" to={"/dashboard"}>Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link style={{ color: "#fff" }} className="nav-link" to={"/stats"}>Stats</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link style={{ color: "#fff" }} to={"/profile"} className="nav-link">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link style={{ color: "#fff" }} onClick={this.handleLogout} className="nav-link" to={"/sign-in"}>Logout</Link>
                                    </li>
                                    <li className="nav-item">
                                    <img src={ProfilePicture} style={{width: 40, height: 40, marginLeft: 50, borderRadius: 20}} />
                                    </li>

                                </>}

                        </ul>
                    </div>
                </div>
            </nav>
        )
    }


}