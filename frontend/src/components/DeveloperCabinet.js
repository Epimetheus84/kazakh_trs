import React, { Component } from 'react';
import styled from 'styled-components';
import UserProfile from './userComponent/UserProfile';
import UsersList from './companyComponents/UsersList';
import CompaniesList from './companyComponents/CompaniesList';
import DocumentsList from './companyComponents/Documents';

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
        this.props.showImages();
    }
    
    
    render(){
    let user = null;
    if(this.props.currentUser){
        user=this.props.currentUser
    }
        return (
            <WrapPage>
                <div style={{display: 'flex'}}>
                    <UserProfile/>
                    <UsersList users={this.props.users} companies={this.props.companies} currentUser={user}/>
                    <CompaniesList companies={this.props.companies}/>
                </div>
                <DocumentsList images={this.props.images}/>
                
            </WrapPage>
        )
    }
    
}