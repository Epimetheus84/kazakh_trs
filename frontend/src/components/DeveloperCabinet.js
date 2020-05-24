import React, { Component } from 'react';
import UserProfile from './reusComponents/UserProfile';
import UsersList from './reusComponents/UsersList';
import CompaniesList from './reusComponents/CompaniesList';
import DocumentsList from './reusComponents/Documents';
import ErrorBoundary from './ErrorBoundary';

import {WrapPage} from '../style/styled_comp/styles';

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
                    <UserProfile url={this.props.url}/>
                    <UsersList 
                        users={this.props.users} 
                        companies={this.props.companies} 
                        currentUser={user} 
                        url={this.props.url}
                        showUsers={this.props.showUsers}
                        />
                    <CompaniesList 
                        companies={this.props.companies} 
                        url={this.props.url}
                        showCompanies={this.props.showCompanies}
                    />
                </div>
                <DocumentsList images={this.props.images} url={this.props.url} showImages={this.props.showImages}/>
            </WrapPage>
        )
    }
    
}