import styled from 'styled-components';

export const WrapPaper = styled.div`
    margin-top: 10px;
    background: #ffffff;
    width: 340px;
    /* height: 200px; */
    box-shadow:  0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-around;
    border-radius: 10px;
`;
export const WrapUserList = styled.div`
    margin-left: 35px;
    margin-top: 10px;
    background: #ffffff;
    width: 90%;
    /* height: 200px; */
    box-shadow:  0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-around;
    border-radius: 10px;
`;
export const WrapDocumentList = styled.div`
    margin-top: 35px;
    background: #ffffff;
    width: 100%;
    /* height: 200px; */
    box-shadow:  0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
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
    border: 1px dotted palevioletred;
`;
export const UserIcon = styled.div`
    height: 55px;
    width: 55px;
    color: white;
    background-color: palevioletred;
    font-size: 2em;
    border-radius: 5px;
    margin: 5px;
    padding: 10px;
    cursor: pointer;
`;

export const Logo = styled.input`
    height: 35px;
    color: palevioletred;
    font-size: 2em;
    border-radius: 10px;
    margin: 15px;
    padding: 10px;
`;

export const Details = styled.div`
    background: ${props => props.primary ? "palevioletred" : "white"};
    color: ${props => props.primary ? "white" : "palevioletred"};
    height: 35px;
    font-size: 2em;
    margin: 15px;
    padding: 0.25em 1em;
    border: 2px dotted palevioletred;
    border-radius: 10px;
`;
