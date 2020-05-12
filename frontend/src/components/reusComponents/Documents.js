import React, {useState} from 'react';
// import axios, {post} from 'axios';
// import DropAndCrop from '../ImageEdit/DropAndCrop';

import {
    WrapPaper, 
    Details, 
    ListWrap, 
    AddImageInput, 
    AddImageIcon, 
    AddImageButton,
    ImageDesc
} from '../../style/styled_comp/styles';

const DocumentsList = (props) => {
    const [file, setFile]=useState(null);
    const [files, setFiles]=useState([]);
    const [isPrimary, setIsPrimary]=useState(false);

    let imagesList = [];
    imagesList=[...imagesList, ...props.images];

    const onFormSubmit = (e) => {
        e.preventDefault() // Stop form submit
        if(file){
            fileUpload(file).then((response)=>{
                console.log(response.data);
            })
        } else 
            alert("Выберите файл для загрузки !")
        
      }
    const onChange = (e) => {console.log("loaded images ", e.target.files[0])
        setFile(e.target.files[0])
        setFiles(<li key={e.target.files[0].size}>
                    файл=> {e.target.files[0].name} 
                </li>)
        setIsPrimary(true);
      }
    const fileUpload = (file) => {
        const url = 'http://kazakh-trs.kz:8080/api/v1/images/create/';
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                Authorization: `token ${sessionStorage.tokenData}`,
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
      }

    return (
        <WrapPaper documents>
            <Details>
                Загруженные документы:      
            </Details>
            <ListWrap>
                <form onSubmit={onFormSubmit}>
                <AddImageIcon htmlFor="file-upload" >
                    Выбрать файл
                </AddImageIcon>
                <AddImageInput type="file" accept="image/*" id="file-upload"  onChange={onChange}/>
                <AddImageButton type="submit" primary={isPrimary}>Загрузить <ul>{files}</ul></AddImageButton>
                
                <hr/>
                
                </form>
                {
                    imagesList.map((item, index) => {
                        return (
                        <ImageDesc key={index}>
                            <div>Загрузил: {item.uploaded_by}</div>
                            <div>Название: {item.original_filename}</div>
                        </ImageDesc>
                        )
                    })
                }
            </ListWrap>
            {/* <DropAndCrop/> */}
        </WrapPaper>
    )
}

export default DocumentsList;