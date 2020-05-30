import React,{useState , useEffect} from 'react';
import {WrapPaper, Details} from '../../style/styled_comp/styles';

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
        fetch(`${props.url}/cabinet/me`, {
            headers: {
                Authorization: `token ${sessionStorage.tokenData}`
            }
        })
        .then(res => {return res.json();})
        .then(
            data => {
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
        <WrapPaper profile={true}>
            <Details style={{marginBottom:"50px"}}>{
                (showRole === 10)?"Разработчик":
                    (showRole === 0)?"Сотрудник":
                    (showRole === 1)?"Модератор":
                    (showRole === 2)?"Администратор":""
                }</Details>
            <Details profile={true} >Логин: {showLogin}</Details>
            <Details profile={true} >Email: {showEmail}</Details>
            <Details profile={true} >Имя: {showFirstName}</Details>
            <Details profile={true} >Отчество: {showMiddleName}</Details>
            <Details profile={true} >Фамилия: {showLastName}</Details>
            <Details profile={true} >Компания: {showCompanyName}</Details>
            <Details profile={true} >Создана: {new Date(showCreated * 1000).getDay()}.{new Date(showCreated * 1000).getMonth()}.{new Date(showCreated * 1000).getFullYear()} {new Date(showCreated * 1000).getHours()}:{new Date(showCreated).getMinutes()}</Details>
            <Details profile={true} >Послед. изменение: {new Date(showCreated * 1000).getDay()}.{new Date(showCreated * 1000).getMonth()}.{new Date(showCreated * 1000).getFullYear()} {new Date(showCreated * 1000).getHours()}:{new Date(showCreated).getMinutes()}</Details>
        </WrapPaper>
    )
}

export default Profile;