import React, {useState} from 'react';
import axios from 'axios';

import {WrapPaper, Details, ListWrap, Button1, DescriptionWrap, DescriptionItems, ButtonDelete} from '../../style/styled_comp/styles';

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

        axios.delete(`http://kazakh-trs.kz:8080/api/v1/companies/delete/${id}`, {
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
        <WrapPaper>
            <Details>
                Компании:      
            </Details>
            <ListWrap>
                <Button1 onClick={showRegisterCompany}>+</Button1>
                {
                    companyList.map((item, index) => {
                        return (
                        <DescriptionWrap key={index}>
                            <DescriptionItems onClick={()=>showEditCompany(item)}>
                                <div>Company: {item.name}</div>
                                <div>Info: {item.info}</div>
                            </DescriptionItems>
                            <ButtonDelete onClick={()=>confirmDeletion(item.id, item.name)} />
                        </DescriptionWrap>
                        )
                    })
                }
            </ListWrap>
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
        </WrapPaper>
    )
}

export default CompaniesList;