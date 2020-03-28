import React from 'react';
import axios from 'axios';
import {WrapPaper, Logo, Details} from './styles';

const Profile = () => {
    return (
        <WrapPaper>
            <Logo 
                type="image" 
                name="image" 
                src="https://mdn.mozillademos.org/files/2917/fxlogo.png" 
                width="50" />
            <Logo type="file" id="logo" name="logo" accept="image/*" />
            <Details>login: </Details>
            <Details>email: </Details>
            <Details>First name: </Details>
            <Details>Middle name: </Details>
            <Details>Last name: </Details>
            <Details>Company Name: </Details>
            <Details>Created: </Details>
            <Details>Last Modified: </Details>
        </WrapPaper>
    )
}

export default Profile;