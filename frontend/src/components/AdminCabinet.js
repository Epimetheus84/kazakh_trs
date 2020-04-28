import React, {useEffect} from 'react';
import styled from 'styled-components';
import UserProfile from './userComponent/UserProfile';
import UsersList from './companyComponents/UsersList';
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

const AdminCabinet = (props) => {
    console.log("wer",props)
    useEffect(()=>{
        props.showUsers();
        props.showCompanies();
    },[])
    
    return (
        <WrapPage>
            {/* <div>
                <h1>Admin Cabinet</h1>
                <h1>Status: {props.loggedInStatus}</h1>
            </div> */}
            <div style={{display: 'flex'}}>
                <UserProfile  users={props.users}/>
                <UsersList  users={props.users} />
            </div>
            <DocumentsList/>
            
        </WrapPage>
    )
}

export default AdminCabinet;