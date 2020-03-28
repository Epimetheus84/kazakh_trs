import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./Home";
import Users from "./Users";
import Cabinet from "./Cabinet";
import axios from 'axios';

export default class App extends Component {

  constructor(){
    super();

    this.state={
      loggedInStatus:"NOT_LOGGED_IN",
      user: {}
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLoggin = this.handleLoggin.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
  }

  handleLogout(){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
  }

  handleLoggin(data){
    this.setState({
      loggedInStatus:"LOGGED_IN",
      user: data
    });
  }

  checkLoginStatus() {
    axios.get('http://localhost: 3001/logged_in',{withCredentials: true})
      .then(response => {
        if(response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user
          })
        } else if( !response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN"){
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
          })
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  }

  componentDidMount(){
    this.checkLoginStatus();
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route 
              exact 
              path={"/"} 
              render={props => (
                <Home {...props} 
                  handleLogout= {this.handleLogout} 
                  handleLoggin= {this.handleLoggin} 
                  loggedInStatus={this.state.loggedInStatus} 
                />
              )} 
            />
            <Route 
              exact 
              path={"/users"} 
              render={props => (
                <Users {...props} loggedInStatus={this.state.loggedInStatus} />
              )} 
            />
            <Route 
              exact 
              path={"/cabinet"} 
              render={props => (
                <Cabinet {...props} loggedInStatus={this.state.loggedInStatus} />
              )} 
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
