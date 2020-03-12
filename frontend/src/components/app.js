import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./Home";
import Users from "./Users";
import Cabinet from "./Cabinet";

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/users"} component={Users} />
            <Route exact path={"/cabinet"} component={Cabinet} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
