import styled from 'styled-components';
import trash from '../../components/reusComponents/icons/trash.svg'

export const WrapPage = styled.div`
    margin-top: 10px;
    padding: 25px;
    background: transparent;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-between;
    border-radius: 10px;
    border-color: gray;
`;

export const WrapPaper = styled.div`
    margin-left: ${props => (props.profile===true) ? 'none' : props.documents ? 'none' :'35px'};
    margin-top: 10px;
    background: #ecf0f3;
    width: ${props => (props.profile===true) ? '45%' : props.documents ? '100%' : '90%'};
    /* height: 200px; */
    box-shadow:  7px 7px 10px #cbced1, -7px -7px 10px #ffffff;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-content: space-around;
    border-radius: 10px;
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
    border-style:${props => (props.profile===true) ? 'solid' : ''};
    border-width:${props => (props.profile===true) ? '1px' : ''};
    font-size: ${props => (props.profile===true) ? '1.5em' : ''}; 
    padding-top:${props => (props.profile===true) ? '10px' : ''};
`;

export const ListWrap = styled.div`
    overflow: auto; 
    height: 100%;
    color: white;
    font-size: 2em;
    border-radius: 5px;
    margin: 15px;
    padding: 10px;
    border: 1px dotted #90d2c6;
`;

export const Button1 = styled.div`
    height: 40px;
    width: 40px;
    color: white;
    background-color: #90d2c6;
    font-size: 2em;
    border-radius: 5px; 
    margin: 5px;
    padding: 10px;
    cursor: pointer;
    position: relative;
    &:hover{
        font-weight: 700;
        font-size: 2.5em;
    }
`;

export const Textarea = styled.textarea`
    width: 1200px;
    height: 200px !important;
    background: white;
    color: #90d2c6;
    height: 35;
    font-size: 1em;
    margin: 15;
    margin-bottom: 10;
    padding: 0.25em 1em;
    border: 2px solid #90d2c6;
    border-radius: 10;
`;

export const Span = styled.span`
    position: absolute;
    transform: translate(50%,-50%);
    top: 50%;
    right: 50%;
    text-align: center;
    width: 100%;
`;

export const Button2 = styled.button`
    background: ${props => props.primary ? "#90d2c6" : "white"};
    color: ${props => props.primary ? "white" : "#90d2c6"};
    height: 35px;
    font-size: 1em;
    margin: 15px;
    margin-bottom: 10px;
    padding: 0.25em 1em;
    border: 2px solid #90d2c6;
    position: relative;
    width: 200px;
    border-radius: 10px;
    cursor: pointer;
    &:hover{
        font-weight: 700;
        color: #54a899;
        box-shadow: 0 0 4px 0px #00000085;
    }
`;

export const Button3 = styled.div`
    height: 15px;
    color: #90d2c6;
    background-color: white;
    border: 1px solid #90d2c6;
    font-size: 1em;
    border-radius: 5px;
    margin: 0px;
    padding: 8px;
    cursor: pointer;
    position: relative;
    width: 300px;
    margin-right: 5px;
    transition: 0.2s;
    &:hover{
        font-weight: 700;
        color: #54a899;
        box-shadow: 0 0 4px 0px #00000085;
    }
`;

export const ButtonDelete = styled.div`
    background-image: url(${trash});
    width: 30px;
    height: 30px;
    filter: invert(1);
    background-repeat: no-repeat;
    background-position: left;
    background-size: cover;
    cursor: pointer;
    transition: 0.2s;
    &:hover{
        // background-color: red;
        // border-radius: 50%;
        filter: none;
    }
`;

export const DescriptionWrap = styled.div`
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
export const DescriptionItems = styled.div`
    color: white;
    font-size: 1em;
    cursor: pointer;
    display: flex;
    flex-direction: column;

    &:hover{
        // color: red;
        font-weight: 700;
    }
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
    background-color: ${props => props.primary ? '#90d2c6' : 'gray'};
    font-size: 1em;
    border-radius: 5px;
    margin: 5px;
    padding: 10px;
    cursor: ${props => props.primary ? 'pointer' : 'default'};
    border: none;
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
    justify-content: space-between;

    &:hover{
        font-weight: 700;
        // color: red;
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
