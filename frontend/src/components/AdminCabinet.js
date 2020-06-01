import React, {useEffect} from 'react';
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
                <UserProfile  users={props.users} />
                {props.currentUser 
                    && <UsersList  
                        users={props.users} 
                        currentUser={props.currentUser} 
                        showUsers={props.showUsers}
                        />}
                {!props.currentUser 
                    && <UsersList  
                        users={props.users} 
                        showUsers={props.showUsers}
                    />}
                
            </div>
            <DocumentsList images={props.images} companies={props.companies}/>
            
        </WrapPage>
    )
}

export default AdminCabinet;