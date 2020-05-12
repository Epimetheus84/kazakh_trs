import React from 'react';

import {
    WrapPaper, 
    Details, 
    Logo
} from '../../style/styled_comp/styles';

const Profile = () => {
    return (
        <WrapPaper>
            <Logo 
                type="image" 
                name="image" 
                src="https://mdn.mozillademos.org/files/2917/fxlogo.png" 
                width="50" />
            <Logo type="file" id="logo" name="logo" accept="image/*" />
            <Details>Company Name: </Details>
            <Details>Info: </Details>
            <Details>Created: </Details>
            <Details>Last Modified: </Details>
        </WrapPaper>
    )
}

export default Profile;