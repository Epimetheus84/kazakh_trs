import React, { Component } from 'react';
import axios from 'axios';
import {WrapPaper, Input, Select, Button} from './styles';
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
            role: 0,
            companyName:"",
            info:"",

            positions:[
                {
                    number:0,
                    name: "User"
                },
                {
                    number:1,
                    name: "Moderator"
                },
                {
                    number:2,
                    name: "Admin"
                },
                {
                    number:10,
                    name: "Developer"
                }
            ]
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitCom = this.handleSubmitCom.bind(this);
    }

    handleSubmit(event){
        const {
            login,
            name,
            email,
            password,
            role,
            first_name,
            last_name,
            company
        } = this.state;



        axios.post('http://26.140.14.182:4444/users/create/', 
        {
            login: login,
            name: name,
            email: email,
            password: password,
            role: role,
            first_name: first_name,
            last_name: last_name,
            company: company,
        },{
            headers: {
                Authorization: `token ${sessionStorage.tokenData}`
            }
        },
        {withCredentials: true}
        ).then(response => {console.log("registration response", response);
            if(response.status === 200){
                this.props.showRegisterComponent();
            }
        }).catch(error=>{
            console.log("registration error", error);
        });

        event.preventDefault();
    }

    handleSubmitCom(event){
        const {
            companyName,
            info
        } = this.state;
        const sessionToken = `token ${sessionStorage.tokenData}`;

        axios.post('http://26.140.14.182:4444/companies/create/', 
        {
                name: companyName,
                info: info,
        },{
            headers: {
                Authorization: sessionToken
            }
        },
        {withCredentials: true}
        ).then(response => {
            if(response.status === 200){
                this.props.showRegisterCompany();
            }
        }).catch(error=>{
            console.log("Company registration error", error);
        })

        console.log("form submitted");
        // event.preventDefault();
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        if(this.props.showRegisterComponent){
            return (
                <WrapPaper style={{position: "absolute"}}>
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
                        <Select 
                            type="number" 
                            name="role" 
                            placeholder="Role"  
                            onChange={this.handleChange} 
                            required 
                        >
                            <option disabled>Role</option>
                            {
                                this.state.positions.map((item,index)=>{
                                        return(
                                            <option key={index} value={item.number}>{item.name}</option>
                                        )
                                    })
                            }
                        </Select>
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
                        <Select 
                            type="text" 
                            name="company" 
                            placeholder="Company"  
                            onChange={this.handleChange} 
                            required 
                        >
                            <option disabled>Company</option>
                            {
                                this.props.companies.map((item,index)=>{
                                    return(
                                        <option key={index} value={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </Select>
    
                        <Button 
                            type='submit'
                        >
                            Register
                        </Button>
                        <Button 
                            onClick={this.props.showRegisterComponent}
                        >
                            Close
                        </Button>
                    </form> 
                </WrapPaper>
            );
        }
        if(this.props.showRegisterCompany){
            return (
                <WrapPaper style={{position: "absolute"}}>
                    <form onSubmit={this.handleSubmitCom} className="regForm">
                        <Input 
                            type="text" 
                            name="companyName" 
                            placeholder="Company Name" 
                            value={this.state.companyName} 
                            onChange={this.handleChange} 
                            required 
                        />
                        <Input 
                            type="text" 
                            name="info" 
                            placeholder="Info" 
                            value={this.state.info} 
                            onChange={this.handleChange} 
                            required 
                        />
                        <Button 
                            type='submit'
                        >
                            Register
                        </Button>
                        <Button 
                            onClick={this.props.showRegisterCompany}
                        >
                            Close
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
                    >
                        Register
                    </Button>
                </form> 
            </WrapPaper>
        );
    }
}

export default Registration;