import React from 'react';
import axios from 'axios';
import {WrapDocumentList, UserIcon, Details, UsersListWrap} from './styles';

const DocumentsList = () => {
    return (
        <WrapDocumentList>
            <Details>
                Загруженные документы:      
            </Details>
            <UsersListWrap>
                <UserIcon>+</UserIcon>
            </UsersListWrap>
        </WrapDocumentList>
    )
}

export default DocumentsList;