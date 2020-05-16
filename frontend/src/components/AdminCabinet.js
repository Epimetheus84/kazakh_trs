import React, {useEffect} from 'react';
import styled from 'styled-components';
import UserProfile from './reusComponents/UserProfile';
import UsersList from './reusComponents/UsersList';
import DocumentsList from './reusComponents/Documents';

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
    useEffect(()=>{
        props.showUsers();
        props.showImages();
    },[])
    console.log("Admin props", props)
    return (
        <WrapPage>
            {/* <div>
                <h1>Admin Cabinet</h1>
                <h1>Status: {props.loggedInStatus}</h1>
            </div> */}
            <div style={{display: 'flex'}}>
                <UserProfile  users={props.users} />
                {props.currentUser && <UsersList  users={props.users} currentUser={props.currentUser}/>}
                {!props.currentUser && <UsersList  users={props.users} />}
                
            </div>
            <DocumentsList images={props.images} companies={props.companies}/>
            
        </WrapPage>
    )
}

export default AdminCabinet;