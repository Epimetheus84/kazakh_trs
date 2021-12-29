/** Author: Eduard Eliseev */
import React, {useState} from 'react';
import axios from 'axios';
// import DropAndCrop from './imageEdit/DropAndCrop';
import Mapper from './imageMapping/Mapper';

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

        axios.delete(`/api/images/delete/${name}`, {
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
        const doDeletion = window.confirm("Хотите удалить изображение ?");
        if(doDeletion){
            handleDeletion(name);
        }
    }
    return (
        <div className='documents__wrapper'>
            <h2>
              Загруженные документы:
            </h2>
            <div className='documents__list'>
                {/* <DropAndCrop url={url} showImages={props.showImages}/> */}
                <hr/>
                <p style={{ marginTop:"25px" }}>
                  Сохраненные изображения
                </p>
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
                        <div className='documents__image-info' key={index}>
                            <div>
                                <div>Загрузил: {item.uploaded_by}</div>
                                <div>Название: {item.original_filename}</div>
                                <div>Дата: {new Date(item.date_created * 1000).getDate()}.{new Date(item.date_created * 1000).getMonth()}.{new Date(item.date_created * 1000).getFullYear()} {new Date(item.date_created * 1000).getHours()}:{new Date(item.date_created).getMinutes()}</div>
                            </div>
                            <div style={{display:'flex'}}>
                                {item.coordinates
                                    && <button onClick={()=>
                                        handleMapperShow(
                                            JSON.parse(item.coordinates),
                                            item.file_url,
                                            JSON.parse(item.image_size),
                                            item.file_path,
                                            item.text
                                            )
                                        }
                                        >
                                            <span>
                                                {item.status === 3 ? "Текст определен" : "Показать координаты"}
                                            </span>
                                        </button>
                                        }
                                {/* {item.status === 3 && setImgText(JSON.parse(item.text))} */}
                                <button onClick={()=>confirmDeletion(item.file_path)}>
                                </button>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DocumentsList;
