import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./Home";
import Users from "./Users";
import ModeratorCabinet from "./ModeratorCabinet";
import DeveloperCabinet from "./DeveloperCabinet";
import AdminCabinet from "./AdminCabinet";
import CommonCabinet from "./CommonCabinet";
import axios from 'axios';
import NavbarReact from "./navigation/navigationPanel";

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
    delete sessionStorage.tokenData;
  }

  handleLoggin(data){
    if(data){
      this.setState({
        loggedInStatus:"LOGGED_IN",
        user: data
      });
    }
  }

  checkLoginStatus() {
    if(sessionStorage.tokenData && this.state.loggedInStatus === "NOT_LOGGED_IN"){
      this.setState({
        loggedInStatus: "LOGGED_IN",
        user: response.data.user
      })
    } else if( !sessionStorage.tokenData && this.state.loggedInStatus === "LOGGED_IN"){
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
      })
    }
  }

  componentDidMount(){
    this.checkLoginStatus();
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <React.Fragment>
          <NavbarReact handleLogout={this.handleLogout}/>
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
                path={"/users/:first_name/:second_name"} 
                render={props => (
                  <Users {...props} loggedInStatus={this.state.loggedInStatus} />
                )} 
              />
              <Route 
                exact 
                path={"/cabinetcommon"} 
                render={props => (
                  <CommonCabinet {...props} loggedInStatus={this.state.loggedInStatus} />
                )} 
              />
              <Route 
                exact 
                path={"/cabinetmoderator"} 
                render={props => (
                  <ModeratorCabinet {...props} loggedInStatus={this.state.loggedInStatus} />
                )} 
              />
              <Route 
                exact 
                path={"/cabinetadmin"} 
                render={props => (
                  <AdminCabinet {...props} loggedInStatus={this.state.loggedInStatus} />
                )} 
              />
              <Route 
                exact 
                path={"/cabinetdeveloper"} 
                render={props => (
                  <DeveloperCabinet {...props} loggedInStatus={this.state.loggedInStatus} />
                )} 
              />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}
