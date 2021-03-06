import React, {useState} from 'react';
import axios, {post} from 'axios';
import DropAndCrop from '../ImageEdit/DropAndCrop';
import Mapper from '../ImageMapping/Mapper';
import { url } from '../serverUrl';

import {
    WrapPaper, 
    Details, 
    ListWrap,
    ImageDesc,
    ButtonDelete,
    Button3,
    Span
} from '../../style/styled_comp/styles';

const DocumentsList = (props) => {
    const [showMapper, setShowMapper]=useState(false);
    const [coords, setCoords]=useState([]);
    const [imgSrc, setImgSrc]=useState('');
    const [imgWidth, setImgWidth]=useState(0);
    const [imgHeight, setImgHight]=useState(0);
    const [imgName, setImgName]=useState('');
    const [imgText, setImgText]=useState('');

    let imagesList = [];
    imagesList=[...imagesList, ...props.images];

    const handleMapperShow = (coords, url, size, name, text) => {
        setCoords(coords);
        setImgSrc(url);
        setImgWidth(size.width);
        setImgHight(size.height);
        setShowMapper(!showMapper);
        setImgName(name);
        setImgText(text);
    }

    const closeMapper = () => {
        setShowMapper(false);
    }

    const handleDeletion = (name) => {
        const sessionToken = `token ${sessionStorage.tokenData}`;

        axios.delete(`${url}/images/delete/${name}`, {
            headers: {
                Authorization: sessionToken
            }
        },
        {withCredentials: true}
        ).then(response => {
            if(response.status === 200){
                console.log("Image deletion response", response)
                alert("Image is Deleted");
            }
        }).catch(error=>{
            console.log("Image deletion error", error);
            alert("Some error happens")
        })

        setTimeout(()=>{
            props.showImages();
        },1500)

        console.log("form submitted");
    }

    const confirmDeletion =(name) => {
        const doDeletion = confirm("Хотите удалить изображение ?");
        if(doDeletion){
            handleDeletion(name);
        }
    }
    return (
        <WrapPaper documents>
            <Details>
                Загруженные документы:      
            </Details>
            <ListWrap>
                <DropAndCrop url={url} showImages={props.showImages}/>
                <hr/>
                <p style={{color: '#90d2c6', marginTop:"25px"}}>Сохраненные изображения</p>
                {showMapper && <Mapper 
                                    coordinates={coords} 
                                    imgSrc={imgSrc}
                                    width={imgWidth}
                                    height={imgHeight}
                                    imgName={imgName}
                                    imgText={imgText}
                                    setImgText={setImgText}
                                    closeMapper={closeMapper}
                                    />}
                {
                    imagesList.map((item, index) => {
                        return (
                        <ImageDesc key={index}>
                            <div>
                                <div>Загрузил: {item.uploaded_by}</div>
                                <div>Название: {item.original_filename}</div>
                                <div>Дата: {new Date(item.date_created * 1000).getDate()}.{new Date(item.date_created * 1000).getMonth()}.{new Date(item.date_created * 1000).getFullYear()} {new Date(item.date_created * 1000).getHours()}:{new Date(item.date_created).getMinutes()}</div>
                            </div>
                            <div style={{display:'flex'}}>
                                {item.coordinates 
                                    && <Button3 onClick={()=>
                                        handleMapperShow(
                                            JSON.parse(item.coordinates), 
                                            item.file_url, 
                                            JSON.parse(item.image_size),
                                            item.file_path,
                                            item.text
                                            )
                                        }
                                        >
                                            <Span>
                                                {item.status === 3 ? "Текст определен" : "Показать координаты"}
                                            </Span>
                                        </Button3>
                                        }
                                {/* {item.status === 3 && setImgText(JSON.parse(item.text))} */}
                                <ButtonDelete onClick={()=>confirmDeletion(item.file_path)}/>
                            </div>
                        </ImageDesc>
                        )
                    })
                }
            </ListWrap>
        </WrapPaper>
    )
}

export default DocumentsList;