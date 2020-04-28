import React, { Component } from 'react';
import styled from 'styled-components';
import UserProfile from './userComponent/UserProfile';
import UsersList from './companyComponents/UsersList';
import CompaniesList from './companyComponents/CompaniesList';
import DocumentsList from './companyComponents/Documents';
import axios from "axios";

const WrapPage = styled.div`
    margin-top: 10px;
    padding: 25px;
    background: transparent;
    width: 1100px;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-between;
    border-radius: 10px;
    border-color: gray;
`;

export default class DeveloperCabinet extends Component{
    constructor(props){
        super(props);

    }

    componentDidMount() {
        this.props.showUsers();
        this.props.showCompanies();
    }
    
    render(){
        return (
            <WrapPage>
                {/* <div>
                    <h1>Developer Cabinet</h1>
                    <h1>Status: {this.props.loggedInStatus}</h1>
                </div> */}
                <div style={{display: 'flex'}}>
                    <UserProfile/>
                    <UsersList users={this.props.users} companies={this.props.companies}/>
                    <CompaniesList companies={this.props.companies}/>
                </div>
                <DocumentsList/>
                
            </WrapPage>
        )
    }
    
}