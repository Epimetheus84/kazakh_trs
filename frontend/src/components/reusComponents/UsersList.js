import React, { useState } from 'react';
import axios from 'axios';

import {
    WrapPaper, 
    Details, 
    ListWrap, 
    Button1, 
    DescriptionWrap, 
    DescriptionItems, 
    ButtonDelete
} from '../../style/styled_comp/styles';

import Registration from '../auth/Registration';


const UsersList = (props) => {
    const [showRegister, setShowRegister] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [user, setUser] = useState({});

    // let userList = [];
    // userList=[...userList, ...props.users];
    let currentUserCompany = null;
    let currentUserRole = null;

    if(props.currentUser ){
        currentUserCompany = props.currentUser.company.id;
        currentUserRole = props.currentUser.role;
    }

    const showRegisterComponent = (data) => {
        setShowRegister(!showRegister); 
    }

    const showEditComponent = (data) => {
        if(data){
            setUser(data);
        }
        if(user){
            setShowEdit(!showEdit);
        }
    }

    const handleDeletion = (login) => {
        const sessionToken = `token ${sessionStorage.tokenData}`;

        axios.delete(`${props.url}/users/delete/${login}`, {
            headers: {
                Authorization: sessionToken
            }
        },
        {withCredentials: true}
        ).then(response => {
            if(response.status === 200){
                console.log("User deletion response", response)
                alert("User is Deleted")
            }
        }).catch(error=>{
            console.log("User deletion error", error);
            alert("Some error happens")
        })
        props.showUsers();
        console.log("form submitted");
    }

    const confirmDeletion =(login) => {
        const doDeletion = confirm("Хотите удалить пользователя ", login, " ?");
        if(doDeletion){
            handleDeletion(login);
        }
    }
    return (
        <WrapPaper>
            <Details>
                Пользователи:      
            </Details>
            <ListWrap>
                <Button1 onClick={showRegisterComponent}>+</Button1>
                {
                    props.users.map((item, index) => {
                        return (
                        <DescriptionWrap key={index}>
                            <DescriptionItems onClick={()=>showEditComponent(item)}>
                                <div>Login: {item.login}</div>
                                <div>Name: {item.first_name}</div>
                                <div>Surname: {item.last_name}</div>
                                <div>Position: {
                                    (item.role===10)?"Developer":
                                    ((item.role===0)?"Employer":
                                    (item.role===1)?"Moderator":"Admin")
                                }
                                </div>
                                <div>Email: {item.email}</div>
                            </DescriptionItems>
                            <ButtonDelete onClick={()=>confirmDeletion(item.login)}/>
                        </DescriptionWrap>
                        )
                    })
                }
            </ListWrap>
            {showRegister
                ? <Registration  
                    showRegisterComponent={showRegisterComponent}
                    companies={props.companies}
                    userRole={currentUserRole}
                    userCompanyDetect={currentUserCompany}
                    showUsers={props.showUsers}
                    url={props.url}
                />
                : null}
            {showEdit
                ? <Registration  
                    showEditComponent={showEditComponent}
                    companies={props.companies}
                    userInfo={user}
                    showUsers={props.showUsers}
                    userRole={currentUserRole}
                    url={props.url}
                />
                : null}
        </WrapPaper>
    )
}

export default UsersList;