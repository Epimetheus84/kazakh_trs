import React from 'react';
import styled from 'styled-components';
import ProfileCompany from './reusComponents/CompanyProfile';
import UsersList from './reusComponents/UsersList';
import DocumentsList from './reusComponents/Documents';

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

const ModeratorCabinet = (props) => {
    return (
        <WrapPage>
            <div>
                <h1>Moderator Cabinet</h1>
                <h1>Status: {props.loggedInStatus}</h1>
            </div>
            <div style={{display: 'flex'}}>
                <ProfileCompany/>
                <UsersList/>
            </div>
            <DocumentsList/>
            
        </WrapPage>
    )
}

export default ModeratorCabinet;