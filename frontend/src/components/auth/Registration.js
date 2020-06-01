import React, { Component } from 'react';
import axios from 'axios';
import {WrapPaper, Input, Select, Button} from './styles';
import {url} from '../serverUrl';

class Registration extends Component {
    constructor(props){
        super(props);

        this.state = {
            login:"",
            oldLogin: "",
            first_name:"",
            last_name:"",
            email: "",
            company:"",
            password: "",
            registrationErrors: "",
            role: 0,
            roleCheck: 0,
            companyName:"",
            info:"",

            positions:[
                {
                    number:0,
                    name: "User"
                },
                // {
                //     number:1,
                //     name: "Moderator"
                // },
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
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.handleSubmitEditCompany = this.handleSubmitEditCompany.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitCom = this.handleSubmitCom.bind(this);
        this.getCurrentUserInfo = this.getCurrentUserInfo.bind(this);
    }

    componentDidMount(){
        if(this.props.userInfo){
            // console.log("INFO",this.props.userInfo)
            this.setState({
                login:this.props.userInfo.login,
                oldLogin: this.props.userInfo.login,
                first_name:this.props.userInfo.first_name,
                last_name:this.props.userInfo.last_name,
                email: this.props.userInfo.email,
                company:this.props.userInfo.company.id,
                role: this.props.userInfo.role
            });
        }
        if(this.props.companyInfo){
            // console.log("Company INFO",this.props.companyInfo)
            this.setState({
                companyName:this.props.companyInfo.name,
                info: this.props.companyInfo.info,
                company: this.props.companyInfo.id
            });
        }
        if(this.props.companies){
            // console.log("Compna",this.props)
            this.setState({
                company: this.props.companies[0].id
            });
        }
        if(this.props.userCompanyDetect){
            // console.log("userCompanyDetect",this.props.userCompanyDetect)
            this.setState({
                company: this.props.userCompanyDetect
            });
        }

        this.getCurrentUserInfo();
    }

    getCurrentUserInfo = async ()=>{
        fetch(`${url}/cabinet/me`, {
            headers: {
                Authorization: `token ${sessionStorage.tokenData}`
            }
          })
          .then(res => {return res.json();})
          .then(
              data => { 
                this.setState({
                    roleCheck: data.role
                });
                }
              );
    }

    handleSubmit(event){
        const {
            login,
            email,
            password,
            role,
            first_name,
            last_name,
            company
        } = this.state;

        axios.post(`${url}/users/create/`, 
        {
            login: login,
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
            alert("Произошла ошибка!", error.response.status);
            this.props.showRegisterComponent();
        });
        setTimeout(()=>{
            this.props.showUsers();
        },1500)
        
        event.preventDefault();
    }

    handleSubmitEdit(event){
        const {
            login,
            oldLogin,
            email,
            password,
            role,
            first_name,
            last_name,
            company
        } = this.state;

        axios.put(`${url}/users/update/${oldLogin}`, 
        {
            login: login,
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
        ).then(response => {console.log("editor response", response);
            if(response.status === 200){
                this.props.showEditComponent();
            }
        }).catch(error=>{
            console.log("editor error", error);
            alert("Произошла ошибка!", error.response.status);
            this.props.showEditComponent();
        });
        setTimeout(()=>{
            this.props.showUsers();
        },1500)
        event.preventDefault();
    }

    handleSubmitCom(event){
        const {
            companyName,
            info
        } = this.state;
        const sessionToken = `token ${sessionStorage.tokenData}`;

        axios.post(`${url}/companies/create/`, 
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
            alert("Произошла ошибка!", error.response.status);
            this.props.showRegisterCompany();
        });
        setTimeout(()=>{
            this.props.showCompanies();
        },1500)
        console.log("form submitted");
        event.preventDefault();
    }

    handleSubmitEditCompany(event){
        const {
            companyName,
            info,
            company
        } = this.state;
        const sessionToken = `token ${sessionStorage.tokenData}`;
        
        axios.put(`${url}/companies/update/${company}`, 
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
                this.props.showEditCompany();
            }
        }).catch(error=>{
            console.log("Company registration error", error);
            alert("Произошла ошибка!", error.response.status);
            this.props.showEditCompany();
        });
        setTimeout(()=>{
            this.props.showCompanies();
        },1500)
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
                        {this.state.roleCheck===10 &&
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
                        }
                        
    
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
        if(this.props.showEditComponent){
            return (
                <WrapPaper style={{position: "absolute"}}>
                    <form onSubmit={this.handleSubmitEdit} className="regForm">
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
                            // defaultValue={ this.state.role }
                            required 
                        >
                            <option >{
                                 (this.state.role===10)?"Developer":
                                (this.state.role===0)?"Employer":
                                (this.state.role===1)?"Moderator":"Admin"
                                 }
                            </option>
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
                        {this.state.roleCheck===10 && 
                            <Select 
                                type="text" 
                                name="company" 
                                placeholder="Company"  
                                onChange={this.handleChange} 
                                defaultValue={ this.props.userInfo.company.name } 
                                required 
                            >
                                <option disabled>{this.props.userInfo.company.name}</option>
                                {
                                    this.props.companies.map((item,index)=>{
                                        return(
                                            <option key={index} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </Select>
                        }
                        
    
                        <Button 
                            type='submit'
                        >
                            Save
                        </Button>
                        <Button 
                            onClick={this.props.showEditComponent}
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
        if(this.props.showEditCompany){
            return (
                <WrapPaper style={{position: "absolute"}}>
                    <form onSubmit={this.handleSubmitEditCompany} className="regForm">
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
                            Save
                        </Button>
                        <Button 
                            onClick={this.props.showEditCompany}
                        >
                            Close
                        </Button>
                    </form> 
                </WrapPaper>
            );
        }
        return "";
    }
}

export default Registration;