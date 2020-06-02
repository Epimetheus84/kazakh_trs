import React, {useEffect} from 'react';
import styled from 'styled-components';
import UserProfile from './reusComponents/UserProfile';
import DocumentsList from './reusComponents/Documents';
import { WrapPage } from '../style/styled_comp/styles';

const CommonCabinet = (props) => {
    useEffect(()=>{
        props.showImages();
    },[])
    return (
        <WrapPage>
            <div style={{display: 'flex'}}>
                <UserProfile />
                <DocumentsList 
                    images={props.images} 
                    style={{marginTop:"10px"}} 
                    showImages={props.showImages}
                />
            </div>
            
            
        </WrapPage>
    )
}

export default CommonCabinet;