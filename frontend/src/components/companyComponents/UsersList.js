import React, { useState } from 'react';
import axios from 'axios';
import {WrapUserList, UserIcon, Details, UsersListWrap} from './styles';
import Registration from '../auth/Registration';

const UsersList = (props) => {
    const [showRegister, setShowRegister] = useState(false);
    // const sessionToken = "token "+ sessionStorage.tokenData;
    // let variable;
    let show;
    
    console.log(props.users,"show")

    return (
        <WrapUserList>
            <Details>
                Пользователи:      
            </Details>
            <UsersListWrap>
                <UserIcon onClick={()=>props.setShowRegister(true)}>+</UserIcon>
                {
                    show
                }
            </UsersListWrap>
            {
                showRegister && <Registration setShowRegister={props.setShowRegister}/>
            }
        </WrapUserList>
    )
}

export default UsersList;