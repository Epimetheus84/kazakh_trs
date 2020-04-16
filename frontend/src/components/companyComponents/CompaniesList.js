import React from 'react';
import axios from 'axios';
import {WrapUserList, UserIcon, Details, UsersListWrap} from './styles';


const UsersList = () => {
    let variable;
    let show;

    return (
        <WrapUserList>
            <Details>
                Компании:      
            </Details>
            <UsersListWrap>
                <UserIcon>+</UserIcon>
                {show}
            </UsersListWrap>
        </WrapUserList>
    )
}

export default UsersList;