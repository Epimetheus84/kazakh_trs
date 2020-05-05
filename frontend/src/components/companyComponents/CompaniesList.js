import React, {useState} from 'react';
import axios from 'axios';

import {
    WrapUserList, 
    UserIcon, 
    UserDescWrap,
    UserIconDesc, 
    Details, 
    DeleteIcon,
    UsersListWrap
} from './styles';
import Registration from '../auth/Registration'

const CompaniesList = (props) => {
    const [showRegister, setShowRegister] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [company, setCompany] = useState({});

    let companyList = [];
    companyList=[...companyList, ...props.companies];

    const showRegisterCompany = () => {
        setShowRegister(!showRegister);
    }

    const showEditCompany = (data) => {
        if(data){
            setCompany(data);
        }
        if(company){
            setShowEdit(!showEdit);
        }
    }

    const handleDeletion = (id) => {
        const sessionToken = `token ${sessionStorage.tokenData}`;

        axios.delete(`http://26.140.14.182:4444/companies/delete/${id}`, {
            headers: {
                Authorization: sessionToken
            }
        },
        {withCredentials: true}
        ).then(response => {
            if(response.status === 200){
                console.log("Company deletion response", response)
                alert("Company is Deleted")
            }
        }).catch(error=>{
            console.log("Company deletion error", error,error.response.status);
            alert("Some error happens")
        })

        console.log("form submitted");
    }

    const confirmDeletion =(id, name) => {
        const doDeletion = confirm("Хотите удалить компанию? ", name, " ?");
        if(doDeletion){
            handleDeletion(id);
        }
    }

    return (
        <WrapUserList>
            <Details>
                Компании:      
            </Details>
            <UsersListWrap>
                <UserIcon onClick={showRegisterCompany}>+</UserIcon>
                {
                    companyList.map((item, index) => {
                        return (
                        <UserDescWrap key={index}>
                            <UserIconDesc onClick={()=>showEditCompany(item)}>
                                <div>Company: {item.name}</div>
                                <div>Info: {item.info}</div>
                            </UserIconDesc>
                            <DeleteIcon onClick={()=>confirmDeletion(item.id, item.name)} />
                        </UserDescWrap>
                        )
                    })
                }
            </UsersListWrap>
            {showRegister
                ? <Registration  
                    showRegisterCompany={showRegisterCompany}
                />
                : null}
            {showEdit
                ? <Registration  
                    showEditCompany={showEditCompany}
                    companyInfo={company}
                />
                : null}
        </WrapUserList>
    )
}

export default CompaniesList;