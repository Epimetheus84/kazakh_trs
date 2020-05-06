import styled from 'styled-components';
import deleteIcon from './icons/button.png';

export const WrapPaper = styled.div`
    margin-top: 10px;
    margin-bottom: 20px;
    background: #ecf0f3;
    width: 340px;
    /* height: 200px; */
    box-shadow:  7px 7px 10px #cbced1, -7px -7px 10px #ffffff;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-around;
    border-radius: 10px;
`;
export const WrapUserList = styled.div`
    margin-left: 35px;
    margin-top: 10px;
    background: #ecf0f3;
    width: 90%;
    /* height: 200px; */
    box-shadow:  7px 7px 10px #cbced1, -7px -7px 10px #ffffff;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-around;
    border-radius: 10px;
`;
export const WrapDocumentList = styled.div`
    margin-top: 10px;
    background: #ecf0f3;
    width: 100%;
    /* height: 200px; */
    box-shadow:  7px 7px 10px #cbced1, -7px -7px 10px #ffffff;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-around;
    border-radius: 10px;
`;
export const UsersListWrap = styled.div`
    overflow: auto; 
    height: 100%;
    color: white;
    font-size: 2em;
    border-radius: 5px;
    margin: 15px;
    padding: 10px;
    border: 1px dotted #90d2c6;
`;
export const UserIcon = styled.div`
    height: 55px;
    width: 55px;
    color: white;
    background-color: #90d2c6;
    font-size: 2em;
    border-radius: 5px;
    margin: 5px;
    padding: 10px;
    cursor: pointer;
`;

export const AddImageInput = styled.input`
    display: none;
`;
export const AddImageIcon = styled.label`
    width: 55px;
    color: white;
    background-color: #90d2c6;
    font-size: 1em;
    border-radius: 5px;
    margin: 5px;
    padding: 10px;
    cursor: pointer;
`;

export const AddImageButton = styled.button`
    color: white;
    background-color: #90d2c6;
    font-size: 1em;
    border-radius: 5px;
    margin: 5px;
    padding: 10px;
    cursor: pointer;
    border: none;
`;

export const UserDescWrap = styled.div`
    width: 90%;
    background-color: #90d2c6;
    font-size: 1em;
    border-radius: 5px;
    margin: 5px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const UserIconDesc = styled.div`
    color: white;
    font-size: 1em;
    cursor: pointer;
    display: flex;
    flex-direction: column;

    &:hover{
        color: red;
    }
`;

export const ImageDesc = styled.div`
    width: 90%;
    background-color: #90d2c6;
    color: white;
    font-size: 1em;
    border-radius: 5px;
    margin: 5px;
    padding: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;

    &:hover{
        color: red;
    }
`;

export const Logo = styled.input`
    height: 35px;
    color: #90d2c6;
    font-size: 2em;
    border-radius: 10px;
    margin: 15px;
    padding: 10px;
`;

export const Details = styled.div`
    background: ${props => props.primary ? "#90d2c6" : "white"};
    color: ${props => props.primary ? "white" : "#90d2c6"};
    height: 35px;
    font-size: 2em;
    margin: 15px;
    padding: 0.25em 1em;
    border: 2px dotted #90d2c6;
    border-radius: 10px;
`;

export const Button = styled.button`
    background: ${props => props.primary ? "#90d2c6" : "white"};
    color: ${props => props.primary ? "white" : "#90d2c6"};
    height: 35px;
    font-size: 1em;
    margin: 15px;
    margin-bottom: 10px;
    padding: 0.25em 1em;
    border: 2px solid #90d2c6;
    border-radius: 10px;
    cursor: pointer;
`;

export const DeleteIcon = styled.div`
    background-image: url(${deleteIcon});
    background-size: cover;
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
    background-position: left;
    background-size: cover;
    cursor: pointer;

    &:hover{
        background-color: red;
        border-radius: 50%;
    }
`;