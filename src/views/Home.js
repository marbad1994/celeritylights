import React, { Component, setState } from 'react';
import { logout, isLogin } from '../utils';
import { BrowserRouter, Switch} from "react-router-dom";
import Login from './Login';
import SignUp from './Signup';
import Dashboard from './Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import Navbar from '../components/Navbar';
import Stats from './Stats';
import Profile from './Profile';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLogin: isLogin()
        }

    }

    componentDidMount() {
        this.setState({isLogin: isLogin()})
    }
   
    render() {
        console.log("WHHHHH")
        return (
            <BrowserRouter history={history}>
            <Navbar/>
            <Switch>
    
              <PublicRoute restricted={false} component={Login} path="/" exact />
              <PublicRoute restricted={false} component={Login} path="/sign-in" exact />
              <PublicRoute restricted={false} component={SignUp} path="/sign-up" exact />
              <PrivateRoute component={Dashboard} path="/dashboard" exact />
              <PrivateRoute component={Stats} path="/stats" exact />
              <PrivateRoute component={Profile} path="/profile" exact />

            </Switch>
    
          </BrowserRouter>
        );
    }
}

export default Home;