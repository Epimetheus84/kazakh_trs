import React, { Component } from 'react';
import Login from './auth/Login';
import {WrapPaper, Button} from './auth/styles';
import {url} from './serverUrl';

class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            showLogin:false,
            showRegister: false,
            currentUser: null
        };

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

    handleSuccesfulAuth = async (token)=>{
        fetch(`${url}/cabinet/me`, {
            headers: {
                Authorization: `token ${token}`
            }
          })
          .then(res => {return res.json();})
          .then(
              data => {
                this.props.handleLoggin(data);
                if (data.role === 10){
                    this.props.history.push("/cabinetdeveloper");
                } else if (data.role === 0){
                    this.props.history.push("/cabinetcommon");
                } else if (data.role === 1){
                    this.props.history.push("/cabinetmoderator");
                } else if (data.role === 2){
                    this.props.history.push("/cabinetadmin");
                }
            });
    }

    handleLogoutClick(){
        this.props.handleLogout;
    }

    render() {
        return (
            <div style={{display:"flex", flexDirection:"column",alignItems:"center", width: "1100px"}}>
                    <br/>
                <WrapPaper>
                    <Button 
                        
                        type='submit'
                        onClick ={()=>this.handleShowComponent("showLogin","showRegister")}
                    >
                        Войти
                    </Button>
                </WrapPaper>
                {this.state.showLogin
                    ? <Login handleSuccesfulAuth={this.handleSuccesfulAuth} saveToken={this.saveToken}/>
                    : null}
            </div>
        );
    }
}

export default Home;