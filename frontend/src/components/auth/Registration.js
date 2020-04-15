import React, { Component } from 'react';
import axios from 'axios';
import {WrapPaper, Input, Button} from './styles';
// import {db} from '../../config';

class Registration extends Component {
    constructor(props){
        super(props);

        this.state = {
            login:"",
            name: "",
            first_name:"",
            last_name:"",
            email: "",
            company:"",
            password: "",
            password_confirmation:"",
            registrationErrors: "",
            role: 0
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
            role,
            first_name,
            last_name,
            company
        } = this.state;

        axios.post('http://26.140.14.182:4444/users/create', {
            user:{
                name: name,
                email: email,
                password: password,
                role: role,
                first_name: first_name,
                last_name: last_name,
                company: company,
            },
            headers: {
                Authorization: `token ${sessionStorage.tokenData}`
            }
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
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        if(this.props.setShowRegister){
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
                            type="number" 
                            name="role" 
                            placeholder="Role" 
                            value={this.state.role} 
                            onChange={this.handleChange} 
                            required 
                        />
                        <Input 
                            type="text" 
                            name="first_name" 
                            placeholder="First name" 
                            value={this.state.first_name} 
                            onChange={this.handleChange} 
                            required 
                        />
                        <Input 
                            type="text" 
                            name="last_name" 
                            placeholder="Last name" 
                            value={this.state.last_name} 
                            onChange={this.handleChange} 
                            required 
                        />
                        <Input 
                            type="text" 
                            name="company" 
                            placeholder="Company" 
                            value={this.state.company} 
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