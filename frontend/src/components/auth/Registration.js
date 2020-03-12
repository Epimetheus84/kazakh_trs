import React, { Component } from 'react';
import axios from 'axios';

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
    }

    handleSubmit(event){
        const {
            name,
            email,
            password,
            password_confirmation
        } = this.state;

        // axios.post('https://localhost: 4444/registrations', {
        //     user:{
        //         name: name,
        //         email: email,
        //         password: password,
        //         password_confirmation: password_confirmation,
        //     },
        // },
        // {withCredentials: true}
        // ).then(response => {
        //     console.log("registration res", response);
        // }).catch(error=>{
        //     console.log("registration error", error);
        // });

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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={this.state.name} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={this.state.email} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password_confirmation" 
                        placeholder="Password confirmation" 
                        value={this.state.password_confirmation} 
                        onChange={this.handleChange} 
                        required 
                    />

                    <button type='submit'>Register</button>
                </form> 
            </div>
        );
    }
}

export default Registration;