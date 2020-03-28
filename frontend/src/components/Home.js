import React, { Component } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import {WrapPaper, Button} from './auth/styles';

class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            showLogin:false,
            showRegister: false
          }

        this.handleSuccesfulAuth = this.handleSuccesfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleShowComponent(dataToShow, dataToHide){
        this.setState({
            [dataToShow]: true,
            [dataToHide]: false
        })
    }

    handleSuccesfulAuth(data){
        this.props.handleLoggin(data);
        this.props.history.push("/cabinet");
    }

    handleLogoutClick(){
        this.props.handleLogout;
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <h1>Status: {this.props.loggedInStatus}</h1>
                <button onClick={()=> this.handleLogoutClick()}>Logout</button>
                <WrapPaper>
                    <Button 
                            type='submit'
                            onClick ={()=>this.handleShowComponent("showLogin","showRegister")}
                        >
                            Войти
                    </Button>
                    <Button 
                            type='submit'
                            onClick ={()=>this.handleShowComponent("showRegister","showLogin")}
                        >
                            Зарегистрироваться
                    </Button>
                </WrapPaper>
                {this.state.showRegister
                    ? <Registration handleSuccesfulAuth={this.handleSuccesfulAuth}/>
                    : null}
                {this.state.showLogin
                    ? <Login handleSuccesfulAuth={this.handleSuccesfulAuth} />
                    : null}
            </div>
        );
    }
}

export default Home;