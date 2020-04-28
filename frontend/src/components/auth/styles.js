import styled from 'styled-components';

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

export const Input = styled.input`
    height: 35px;
    color: #90d2c6;
    font-size: 2em;
    border: none;
    outline: none;
    background: none;
    border-radius: 10px;
    margin: 15px;
    padding: 5px;
    padding-left: 15px; 
    box-shadow: inset 8px 8px 8px #cbced1,
                inset -8px -8px 8px #ffffff;
`;

export const Select = styled.select`
    height: 35px;
    color: #90d2c6;
    font-size: 2em;
    border: 1px solid #90d2c6;
    border-radius: 10px;
    margin: 15px;
    padding: 10px;
`;

export const Button = styled.button`
    background: ${props => props.primary ? "#90d2c6" : "white"};
    color: ${props => props.primary ? "white" : "#90d2c6"};
    height: 35px;
    font-size: 2em;
    margin: 15px;
    padding: 0.25em 1em;
    border-radius: 10px;
    border: none;
    cursor: pointer;
`;
