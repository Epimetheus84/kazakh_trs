import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Home'
import Users from './Users'
import ModeratorCabinet from './ModeratorCabinet'
import DeveloperCabinet from './DeveloperCabinet'
import AdminCabinet from './AdminCabinet'
import CommonCabinet from './CommonCabinet'
import NavigationPanel from './navigation/navigationPanel'
import Mapper from './ImageMapping/Mapper'
import axios from 'axios'
import { url } from './serverUrl'

export default class App extends Component {
  constructor () {
    super()

    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: null,
      usersList: [],
      companiesList: [],
      imagesList: []
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.handleLoggin = this.handleLoggin.bind(this)
    this.checkLoginStatus = this.checkLoginStatus.bind(this)
    this.saveUsersList = this.saveUsersList.bind(this)
    this.saveCompaniesList = this.saveCompaniesList.bind(this)
    this.saveImagesList = this.saveImagesList.bind(this)
    this.showUsers = this.showUsers.bind(this)
    this.showCompanies = this.showCompanies.bind(this)
    this.showImages = this.showImages.bind(this)
  }

  showUsers = async () => {
    const sessionToken = 'token ' + sessionStorage.tokenData;
    let res = await axios.get(`${url}/users/list`, {
      headers: {
        Authorization: sessionToken
      }
    });
    let { data } = res;
    this.saveUsersList(data);
  }

  showCompanies = async () => {
    const sessionToken = 'token ' + sessionStorage.tokenData
    let res = await axios.get(`${url}/companies/list`, {
      headers: {
        Authorization: sessionToken
      }
    })
    let { data } = res
    this.saveCompaniesList(data)
  }

  showImages = async () => {
    const sessionToken = 'token ' + sessionStorage.tokenData
    let res = await axios.get(`${url}/images/list`, {
      headers: {
        Authorization: sessionToken
      }
    })
    let { data } = res
    this.saveImagesList(data)
  }

  saveCompaniesList (data) {
    if (data) {
      this.setState(state => {
        const companiesList = [...data]
        return {
          companiesList,
          data: ''
        }
      })
    }
  }

  saveUsersList (data) {
    if (data) {
      this.setState(state => {
        const usersList = [...data]
        return {
          usersList,
          data: ''
        }
      })
    }
  }

  saveImagesList (data) {
    if (data) {
      this.setState(state => {
        const imagesList = [...data]
        return {
          imagesList,
          data: ''
        }
      })
    }
  }

  handleLogout () {
    sessionStorage.removeItem('tokenData')

    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
      user: null,
      usersList: [],
      companiesList: [],
      imagesList: []
    })
  }

  handleLoggin (data) {
    if (data) {
      this.setState({
        loggedInStatus: 'LOGGED_IN',
        user: data
      })
    }
  }

  checkLoginStatus () {
    if (
      sessionStorage.tokenData &&
      this.state.loggedInStatus === 'NOT_LOGGED_IN'
    ) {
      this.setState({
        loggedInStatus: 'LOGGED_IN'
      })
    } else if (
      !sessionStorage.tokenData &&
      this.state.loggedInStatus === 'LOGGED_IN'
    ) {
      this.setState({
        loggedInStatus: 'NOT_LOGGED_IN',
        user: {}
      })
    }
  }

  componentDidMount () {
    this.checkLoginStatus()
  }

  render () {
    return (
      <div className='app'>
        <BrowserRouter>
          <React.Fragment>
            <NavigationPanel handleLogout={this.handleLogout} />
            <Switch>
              <Route
                exact
                path={'/'}
                render={props => (
                  <Home
                    {...props}
                    handleLogout={this.handleLogout}
                    handleLoggin={this.handleLoggin}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                )}
              />
              <Route
                exact
                path={'/users/:first_name/:second_name'}
                render={props => (
                  <Users
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                )}
              />
              <Route
                exact
                path={'/cabinetcommon'}
                render={props => (
                  <CommonCabinet
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                    currentUser={this.state.user}
                    images={this.state.imagesList}
                    showImages={this.showImages}
                  />
                )}
              />
              <Route
                exact
                path={'/cabinetmoderator'}
                render={props => (
                  <ModeratorCabinet
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                    showUsers={this.showUsers}
                    showCompanies={this.showCompanies}
                    users={this.state.usersList}
                    companies={this.state.companiesList}
                    currentUser={this.state.user}
                  />
                )}
              />
              <Route
                exact
                path={'/cabinetadmin'}
                render={props => (
                  <AdminCabinet
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                    showUsers={this.showUsers}
                    showCompanies={this.showCompanies}
                    users={this.state.usersList}
                    companies={this.state.companiesList}
                    images={this.state.imagesList}
                    showImages={this.showImages}
                    currentUser={this.state.user}
                  />
                )}
              />
              <Route
                exact
                path={'/cabinetdeveloper'}
                render={props => (
                  <DeveloperCabinet
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                    showUsers={this.showUsers}
                    showCompanies={this.showCompanies}
                    users={this.state.usersList}
                    companies={this.state.companiesList}
                    images={this.state.imagesList}
                    showImages={this.showImages}
                    currentUser={this.state.user}
                  />
                )}
              />
              <Route
                exact
                path={'/imagemapping/:filePath'}
                render={props => <Mapper {...props} />}
              />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    )
  }
}
