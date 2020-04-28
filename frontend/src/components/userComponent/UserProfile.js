import React,{useState} from 'react';
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
        fetch("http://26.140.14.182:4444/cabinet/me", {
            headers: {
                Authorization: `token ${sessionStorage.tokenData}`
            }
        })
        .then(res => {return res.json();})
        .then(
            data => {
                console.log("This user info = ",data);
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
    handleSuccesfulAuth();
    return (
        <WrapPaper>
            <Details>Роль: {
                (showRole === 10)?"/Разработчик":
                    (showRole === 0)?"Сотрудник":
                    (showRole === 1)?"Модератор":
                    (showRole === 2)?"Администратор":""
                }</Details>
            <Details>Логин: {showLogin}</Details>
            <Details>Email: {showEmail}</Details>
            <Details>Имя: {showFirstName}</Details>
            <Details>Отчество: {showMiddleName}</Details>
            <Details>Фамилия: {showLastName}</Details>
            <Details>Компания: {showCompanyName}</Details>
            <Details>Создана: {showCreated}</Details>
            <Details>Послед. изменение: {showLastModified}</Details>
        </WrapPaper>
    )
}

export default Profile;