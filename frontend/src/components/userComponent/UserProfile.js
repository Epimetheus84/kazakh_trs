import React,{useState , useEffect} from 'react';
import axios from 'axios';
import {WrapPaper, Logo, Details} from './styles';

const Profile = (props) => {
    const [showRole, setShowRole] = useState(0);
    const [showLogin, setShowLogin] = useState("");
    const [showEmail, setShowEmail] = useState("");
    const [showFirstName, setShowFirstName] = useState("");
    const [showMiddleName, setShowMiddleName] = useState("");
    const [showLastName, setShowLastName] = useState("");
    const [showCompanyName, setShowCompanyName] = useState("");
    const [showCreated, setShowCreated] = useState(0);
    const [showLastModified, setlastModified] = useState(0);

    const handleSuccesfulAuth = async ()=>{
        fetch("http://kazakh-trs.kz:8080/api/v1/cabinet/me", {
            headers: {
                Authorization: `token ${sessionStorage.tokenData}`
            }
        })
        .then(res => {return res.json();})
        .then(
            data => {
                console.log("herererere")
                setShowRole(data.role); 
                setShowLogin(data.login); 
                setShowEmail(data.email); 
                setShowFirstName(data.first_name); 
                setShowMiddleName(data.middle_name); 
                setShowLastName(data.last_name); 
                setShowCompanyName(data.company.name); 
                setShowCreated(data.date_created); 
                setlastModified(data.date_modified); 
                }
            );
    }

    useEffect(()=>{
        handleSuccesfulAuth();
    },[])
    
    return (
        <WrapPaper>
            <Details style={{marginBottom:"50px"}}>{
                (showRole === 10)?"Разработчик":
                    (showRole === 0)?"Сотрудник":
                    (showRole === 1)?"Модератор":
                    (showRole === 2)?"Администратор":""
                }</Details>
            <Details style={{borderStyle:"solid", borderWidth:"1px", fontSize: "1.5em", paddingTop:"10px"}}>Логин: {showLogin}</Details>
            <Details style={{borderStyle:"solid", borderWidth:"1px", fontSize: "1.5em", paddingTop:"10px"}}>Email: {showEmail}</Details>
            <Details style={{borderStyle:"solid", borderWidth:"1px", fontSize: "1.5em", paddingTop:"10px"}}>Имя: {showFirstName}</Details>
            <Details style={{borderStyle:"solid", borderWidth:"1px", fontSize: "1.5em", paddingTop:"10px"}}>Отчество: {showMiddleName}</Details>
            <Details style={{borderStyle:"solid", borderWidth:"1px", fontSize: "1.5em", paddingTop:"10px"}}>Фамилия: {showLastName}</Details>
            <Details style={{borderStyle:"solid", borderWidth:"1px", fontSize: "1.5em", paddingTop:"10px"}}>Компания: {showCompanyName}</Details>
            <Details style={{borderStyle:"solid", borderWidth:"1px", fontSize: "1.5em", paddingTop:"10px"}}>Создана: {showCreated}</Details>
            <Details style={{borderStyle:"solid", borderWidth:"1px", fontSize: "1.5em", paddingTop:"10px"}}>Послед. изменение: {showLastModified}</Details>
        </WrapPaper>
    )
}

export default Profile;