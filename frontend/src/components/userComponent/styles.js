import styled from 'styled-components';

export const WrapPaper = styled.div`
    margin-top: 10px;
    /* margin-bottom: 20px; */
    background: #ecf0f3;
    width: 340px;
    /* height: 200px; */
    box-shadow:  7px 7px 10px #cbced1, -7px -7px 10px #ffffff;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: start;
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
    min-height: 35px;
    font-size: 2em;
    margin: 10px 15px;
    padding: 0.25em 0.5em;
    border: 2px dotted #90d2c6;
    border-radius: 10px;

    /* border: none;
    outline: none;
    background: none;
    box-shadow: inset 5px 5px 5px #cbced1,
                inset -5px -5px 5px #ffffff; */
`;
