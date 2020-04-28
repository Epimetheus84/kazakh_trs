import React, {useState} from 'react';
import {WrapUserList, UserIcon, UserIconDesc, Details, UsersListWrap} from './styles';
import Registration from '../auth/Registration'

const CompaniesList = (props) => {
    const [showRegister, setShowRegister] = useState(false);

    let companyList = [];
    companyList=[...companyList, ...props.companies];

    const showRegisterCompany = () => {
        setShowRegister(!showRegister); 
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
                        <UserIconDesc key={index}>
                            <div>Company: {item.name}</div>
                            <div>Info: {item.info}</div>
                        </UserIconDesc>
                        )
                    })
                }
            </UsersListWrap>
            {showRegister
                ? <Registration  
                    showRegisterCompany={showRegisterCompany}
                />
                : null}
        </WrapUserList>
    )
}

export default CompaniesList;