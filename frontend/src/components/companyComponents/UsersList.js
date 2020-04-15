import React, { useState } from 'react';
import axios from 'axios';
import {WrapUserList, UserIcon, Details, UsersListWrap} from './styles';
import Registration from '../auth/Registration';

const showUsers =(variable) => {
    if(sessionStorage.tokenData){
        fetch("http://26.140.14.182:4444/users/list", {
            headers: {
                Authorization: `token ${sessionStorage.tokenData}`
            }
          })
          .then(res => {return res.json();})
          .then(
              data => {
                  console.log(data);
                  variable = data;
                }
              );
    }
    
}

const UsersList = () => {
    const [showRegister, setShowRegister] = useState(false);

    let variable;
    let show;
    showUsers.bind(variable);
    console.log(variable,"dsasd");
    if(variable){
        show = (console.log(variable,"show"))
    }
    return (
        <WrapUserList>
            <Details>
                Пользователи:      
            </Details>
            <UsersListWrap>
                <UserIcon onClick={()=>setShowRegister(true)}>+</UserIcon>
                {
                    show
                }
            </UsersListWrap>
            {
                showRegister && <Registration setShowRegister={setShowRegister}/>
            }
        </WrapUserList>
    )
}

export default UsersList;