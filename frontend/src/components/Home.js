import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import {WrapPaper, Button} from './auth/styles';

class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            showLogin:false,
            showRegister: false,
            currentUser: null
          }

        this.handleSuccesfulAuth = this.handleSuccesfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.saveToken = this.saveToken.bind(this);
    }

    saveToken(token) {
        sessionStorage.setItem('tokenData', token);
    }

    handleShowComponent(dataToShow, dataToHide){
        this.setState({
            [dataToShow]: true,
            [dataToHide]: false
        })
    }

    handleSuccesfulAuth = async (token, userconfig)=>{
        // this.props.handleLoggin(token);
        // console.log("ПИХАЕМ ЭТОТ ТОКЕН",`token ${token}`);

        // let res = await axios.get("http://26.140.14.182:4444/cabinet/me", {
        //         headers: {
        //             Authorization: `token ${token}`
        //         }
        //       }).then(res => console.log("rersfd",res));
        // let { data } = res.data;

        fetch("http://26.140.14.182:4444/cabinet/me", {
            headers: {
                Authorization: `token ${token}`
            }
          })
          .then(res => {return res.json();})
          .then(
              data => {
                    this.props.handleLoggin(data);
                  if(data.role === 10){
                    this.props.history.push("/cabinetdeveloper");
                  } else if(data.role === 0){
                    this.props.history.push("/cabinetcommon");
                  } else if(data.role === 1){
                    this.props.history.push("/cabinetmoderator");
                } else if(data.role === 2){
                    this.props.history.push("/cabinetadmin");
                    }
                }
              );
    }

    handleLogoutClick(){
        this.props.handleLogout;
    }

    render() {
        return (
            <div style={{display:"flex", flexDirection:"column",alignItems:"center", width: "1100px"}}>
                    <br/>
                {/* <h1>Home</h1>
                <h1>Status: {this.props.loggedInStatus}</h1>
                <button onClick={()=> this.handleLogoutClick()}>Logout</button> */}
                <WrapPaper>
                    <Button 
                        primary
                        type='submit'
                        onClick ={()=>this.handleShowComponent("showLogin","showRegister")}
                    >
                        Войти
                    </Button>
                    {/* <Button 
                        primary
                        type='submit'
                        onClick ={()=>this.handleShowComponent("showRegister","showLogin")}
                    >
                            Зарегистрироваться
                    </Button> */}
                </WrapPaper>
                {/* {this.state.showRegister
                    ? <Registration handleSuccesfulAuth={this.handleSuccesfulAuth}/>
                    : null} */}
                {this.state.showLogin
                    ? <Login handleSuccesfulAuth={this.handleSuccesfulAuth} saveToken={this.saveToken}/>
                    : null}
            </div>
        );
    }
}

export default Home;