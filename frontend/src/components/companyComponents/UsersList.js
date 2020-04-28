import React, { useState } from 'react';
import {WrapUserList, UserIcon, UserIconDesc, Details, UsersListWrap, Button} from './styles';
import Registration from '../auth/Registration';


const UsersList = (props) => {
    const [showRegister, setShowRegister] = useState(false);

    let userList = [];
    userList=[...userList, ...props.users];

    const showRegisterComponent = () => {
        setShowRegister(!showRegister); 
    }

    return (
        <WrapUserList>
            <Details>
                Пользователи:      
            </Details>
            <UsersListWrap>
                <UserIcon onClick={showRegisterComponent}>+</UserIcon>
                {
                    userList.map((item, index) => {
                        return (
                        <UserIconDesc key={index}>
                            <div>Name: {item.first_name}</div>
                            <div>Surname: {item.last_name}</div>
                            <div>Position: {
                                (item.role===10)?"Developer":((item.role===0)?"Employer":(item.role===1)?"Moderator":"Admin")
                            }
                            </div>
                            <div>Email: {item.email}</div>
                        </UserIconDesc>
                        )
                    })
                }
            </UsersListWrap>
            {showRegister
                ? <Registration  
                    showRegisterComponent={showRegisterComponent}
                    companies={props.companies}
                />
                : null}
        </WrapUserList>
    )
}

export default UsersList;