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

export const Input = styled.input`
    height: 35px;
    color: palevioletred;
    font-size: 2em;
    border: 1px solid palevioletred;
    border-radius: 10px;
    margin: 15px;
    padding: 10px;
`;

export const Button = styled.button`
    background: ${props => props.primary ? "palevioletred" : "white"};
    color: ${props => props.primary ? "white" : "palevioletred"};
    height: 35px;
    font-size: 2em;
    margin: 15px;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 10px;
    cursor: pointer;
`;
