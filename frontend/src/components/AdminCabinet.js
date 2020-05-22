import React, {useEffect} from 'react';
import styled from 'styled-components';
import UserProfile from './reusComponents/UserProfile';
import UsersList from './reusComponents/UsersList';
import DocumentsList from './reusComponents/Documents';
import { WrapPage } from '../style/styled_comp/styles';

const AdminCabinet = (props) => {
    useEffect(()=>{
        props.showUsers();
        props.showImages();
    },[])
    
    return (
        <WrapPage>
            {/* <div>
                <h1>Admin Cabinet</h1>
                <h1>Status: {props.loggedInStatus}</h1>
            </div> */}
            <div style={{display: 'flex'}}>
                <UserProfile  users={props.users} url={props.url} />
                {props.currentUser 
                    && <UsersList  
                        users={props.users} 
                        currentUser={props.currentUser} 
                        url={props.url}
                        showUsers={props.showUsers}
                        />}
                {!props.currentUser 
                    && <UsersList  
                        users={props.users} 
                        url={props.url}
                        showUsers={props.showUsers}
                    />}
                
            </div>
            <DocumentsList images={props.images} companies={props.companies} url={props.url}/>
            
        </WrapPage>
    )
}

export default AdminCabinet;