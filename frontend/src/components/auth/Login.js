import React, { Component } from 'react';
import axios from 'axios';
import {WrapPaper, Input, Button} from './styles';
// import {db} from '../../config';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            login: "",
            password: "",
            loginErrors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onHover = this.onHover.bind(this);
    }

    onHover(){
        // console.log("hover",event);
    }

    handleSubmit(event){
        const {
            login,
            password
        } = this.state;
        
        axios.post('http://26.140.14.182:4444/cabinet/login/', {
            login: login,
            password: password,
        },
        {withCredentials: true}
        ).then(response => {
            this.props.saveToken(response.data.token);
            if(response.data.token){
                this.props.handleSuccesfulAuth(response.data.token, response.config.data);
            }
        }).catch(error=>{
            if(error.response.status === 401){
                alert("Введен неправильный пароль или логин");
            }
            console.log("login error", error.response.status);
        });

        console.log("form submitted");
        event.preventDefault();
    }
    
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <WrapPaper>
                <form onSubmit={this.handleSubmit} className="regForm">
                    <Input 
                        type="text" 
                        name="login" 
                        placeholder="Login" 
                        value={this.state.login} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <Input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        required 
                    />

                    <Button 
                        type='submit'
                        // onMouseOver ={()=>this.onHover()}
                    >
                        Login
                    </Button>
                </form> 
            </WrapPaper>
        );
    }
}
export default Login;