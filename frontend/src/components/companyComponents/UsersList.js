import React from 'react';
import axios from 'axios';
import {WrapUserList, UserIcon, Details, UsersListWrap} from './styles';

const UsersList = () => {
    return (
        <WrapUserList>
            <Details>
                Пользователи:      
            </Details>
            <UsersListWrap>
                <UserIcon>+</UserIcon>
            </UsersListWrap>
        </WrapUserList>
    )
}

export default UsersList;