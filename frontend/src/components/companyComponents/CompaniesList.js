import React from 'react';
import axios from 'axios';
import {WrapUserList, UserIcon, Details, UsersListWrap} from './styles';

const showCompanies =(variable) => {
    if(sessionStorage.tokenData){
        fetch("http://26.140.14.182:4444/companies/list", {
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