import React, {useEffect} from 'react';
import styled from 'styled-components';
import ProfileCompany from './companyComponents/CompanyProfile';
import UserProfile from './userComponent/UserProfile';
import DocumentsList from './companyComponents/Documents';

const WrapPage = styled.div`
    margin-top: 10px;
    padding: 25px;
    background: transparent;
    width: 1100px;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-between;
    border-radius: 10px;
    border-color: gray;
`;

const CommonCabinet = (props) => {
    useEffect(()=>{
        props.showImages();
    },[])
    return (
        <WrapPage>
            <div style={{display: 'flex'}}>
                <UserProfile/>
                <DocumentsList images={props.images} style={{marginTop:"10px"}}/>
            </div>
            
            
        </WrapPage>
    )
}

export default CommonCabinet;