import React, { Component } from 'react';
import { isLogin } from '../utils';
import { BrowserRouter, Switch} from "react-router-dom";
import Login from './Login';
import SignUp from './Signup';
import Dashboard from './Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import WebNav from '../components/WebNav';
import Stats from './Stats';
import Profile from './Profile';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BrowserRouter history={history} forceRefresh={true} >
            <WebNav history={history}/>
            <Switch>
              <PrivateRoute component={Dashboard} path="/" exact />
              <PublicRoute restricted={false} component={Login} path="/sign-in" exact />
              <PublicRoute restricted={false} component={SignUp} path="/sign-up" exact />
              <PrivateRoute component={Dashboard} path="/dashboard" exact />
              <PrivateRoute component={Stats} path="/statitics" exact />
              <PrivateRoute component={Profile} path="/profile" exact />

            </Switch>
    
          </BrowserRouter>
        );
    }
}

export default Home;