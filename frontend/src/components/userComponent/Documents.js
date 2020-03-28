import React from 'react';
import axios from 'axios';
import {WrapDocumentList, UserIcon, Details, UsersListWrap} from './styles';

const DocumentsList = () => {
    return (
        <UsersListWrap>
            <Details>
                Загруженные документы:      
            </Details>
            <UsersListWrap>
                <UserIcon>+</UserIcon>
            </UsersListWrap>
        </UsersListWrap>
    )
}

export default DocumentsList;