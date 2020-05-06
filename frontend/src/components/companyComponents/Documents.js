import React, {useState} from 'react';
import axios, {post} from 'axios';
import DropAndCrop from '../ImageEdit/DropAndCrop';

import {
    WrapDocumentList, 
    AddImageInput, 
    AddImageIcon, 
    AddImageButton,
    ImageDesc, 
    Details, 
    UsersListWrap
} from './styles';

const DocumentsList = (props) => {
    const [file, setFile]=useState(null);

    let imagesList = [];
    imagesList=[...imagesList, ...props.images];

    const onFormSubmit = (e) => {
        e.preventDefault() // Stop form submit
        fileUpload(file).then((response)=>{
          console.log(response.data);
        })
      }
    const onChange = (e) => {
        setFile(e.target.files[0])
      }
    const fileUpload = (file) => {
        const url = 'http://26.140.14.182:4444/images/create/';
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
        <WrapDocumentList>
            <Details>
                Загруженные документы:      
            </Details>
            <UsersListWrap>
                <form onSubmit={onFormSubmit}>
                <AddImageIcon htmlFor="file-upload" >
                    Выбрать файл
                </AddImageIcon>
                <AddImageInput type="file" accept="image/*" id="file-upload"  onChange={onChange}/>
                <AddImageButton type="submit">Загрузить</AddImageButton>
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
            </UsersListWrap>
            {/* <DropAndCrop/> */}
        </WrapDocumentList>
    )
}

export default DocumentsList;