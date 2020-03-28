import React, { Component } from 'react';
import axios from 'axios';
import {WrapPaper, Input, Button} from './styles';
// import {db} from '../../config';

class Registration extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            password_confirmation:"",
            registrationErrors: ""
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
            name,
            email,
            password,
            password_confirmation
        } = this.state;
        
        // Firebase connection through config.js/////////////////////////////////////////////////////////
        // db.ref('/user').push({
        //     user:{
        //         name: name,
        //         email: email,
        //         password: password,
        //         password_confirmation: password_confirmation,
        //     }
        //   });
        //   console.log('Action!', 'A new To-do item was created');

        // Firebase connection through AXIOS///////////////////////////////////////////////////////////////////
        axios.post('https://registration-3c6c4.firebaseio.com/user', {
            user:{
                name: name,
                email: email,
                password: password,
                password_confirmation: password_confirmation,
            },
        },
        {withCredentials: true}
        ).then(response => {
            if(response.data.status === "created"){
                this.props.handleSuccesfulAuth(response.data);
            }
        }).catch(error=>{
            this.props.handleSuccesfulAuth();
            console.log("registration error", error);
            
        });

        console.log("form submitted");
        event.preventDefault();
    }
    handleChange(event){
        console.log("handle change", event);
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
                        name="name" 
                        placeholder="Name" 
                        value={this.state.name} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <Input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={this.state.email} 
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
                    <Input 
                        type="password" 
                        name="password_confirmation" 
                        placeholder="Password confirmation" 
                        value={this.state.password_confirmation} 
                        onChange={this.handleChange} 
                        required 
                    />

                    <Button 
                        type='submit'
                        onMouseOver ={()=>this.onHover()}
                    >
                        Register
                    </Button>
                </form> 
            </WrapPaper>
        );
    }
}

export default Registration;