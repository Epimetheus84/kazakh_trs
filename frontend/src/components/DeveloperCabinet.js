import React, { Component } from 'react';
import styled from 'styled-components';
import ProfileCompany from './companyComponents/CompanyProfile';
import UsersList from './companyComponents/UsersList';
import CompaniesList from './companyComponents/CompaniesList';
import DocumentsList from './companyComponents/Documents';
import axios from "axios";

const WrapPage = styled.div`
    margin-top: 10px;
    padding: 25px;
    background: #ffffff;
    width: 1340px;
    /* height: 200px; */
    box-shadow:  0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-around;
    border-radius: 10px;
    border-color: gray;
`;

export default class DeveloperCabinet extends Component{
    state = {
        users2: []
    };
    componentDidMount() {
        this.showUsers();
    }
    showUsers = async() => {
        const sessionToken = "token "+ sessionStorage.tokenData;
    
        let res = await axios.get("http://26.140.14.182:4444/users/list", {
            headers: {
                Authorization: sessionToken
            }
        });
        let {data} = res;
        this.setState({ users2: data });
        console.log('data',data);
    }
      
    render(){
        if(this.state.users2.length < 0){
            console.log("users2",this.state.users2)
        }
        
        return (
            <WrapPage>
                <div>
                    <h1>Developer Cabinet</h1>
                    <h1>Status: {this.props.loggedInStatus}</h1>
                </div>
                <div style={{display: 'flex'}}>
                    <ProfileCompany/>
                    <UsersList showUsers={this.props.showUsers} users={this.props.users}/>
                    <CompaniesList/>
                </div>
                <DocumentsList/>
                
            </WrapPage>
        )
    }
    
}