import React, {useState} from 'react';
import axios from 'axios';
import {url} from '../serverUrl';

import {WrapPaper, Details, ListWrap, Button1, DescriptionWrap, DescriptionItems, ButtonDelete, Span} from '../../style/styled_comp/styles';

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

        axios.delete(`${url}/companies/delete/${id}`, {
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

        setTimeout(()=>{
            props.showCompanies();
        },1500)
        
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
                <Button1 onClick={showRegisterCompany}>
                    <Span>
                        +
                    </Span>
                </Button1>
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
                    showCompanies={props.showCompanies}
                />
                : null}
            {showEdit
                ? <Registration  
                    showEditCompany={showEditCompany}
                    companyInfo={company}
                    showCompanies={props.showCompanies}
                />
                : null}
        </WrapPaper>
    )
}

export default CompaniesList;