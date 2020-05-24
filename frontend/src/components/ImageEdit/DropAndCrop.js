import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Dropzone from 'react-dropzone';
import {
    image64toCanvasRef, 
    base64StringtoFile, 
    downloadBase64File,
    extractImageFileExtensionFromBase64
} from './ResuableUtils';
import axios, {post} from 'axios';

const imageMaxSize = 100000000;
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})

function DropAndCrop(props) {
    const [files, setFiles]=useState([]);
    const [imgSrc, setImgSrc]=useState(null);
    const [imgSrcExt, setImgSrcExt]=useState(null);
    // const [crop, setCrop]=useState({aspect:1/1});
    const [crop, setCrop]=useState({});

    const imagePreviewCanvasRef = React.createRef();


    const [file, setFile]=useState(null);

    const verifyFile = (file)=>{
        if(file && file.length > 0){
            const currentFile = file[0];
            const currentFileType = currentFile.type;
            const currentFileSize = currentFile.size;
            if(currentFileSize > imageMaxSize){
                alert("Image file is not allowed. " + currentFileSize + " bytes is too large")
                return false;
            }
            if (!acceptedFileTypesArray.includes(currentFileType)){
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }

    const handleOnDrop = (acceptedFiles, rejectedFiles) =>{
        acceptedFiles.map(file =>(
            setFiles(
                <li key={file.path}>
                    {file.path} - {parseInt(file.size)/1000000} Мегабайт
                </li>)
            )
        );
        if(rejectedFiles && rejectedFiles.length > 0){
            verifyFile(rejectedFiles);
        }
        if(acceptedFiles && acceptedFiles.length > 0){
            const isVerified = verifyFile(acceptedFiles);
                if (isVerified){
                    // imageBase64Data 
                    const currentFile = acceptedFiles[0];
                    setFile(acceptedFiles[0]);
                    const myFileItemReader = new FileReader()
                    myFileItemReader.addEventListener("load", ()=>{
                        const myResult = myFileItemReader.result
                        setImgSrc(myResult);
                        setImgSrcExt(extractImageFileExtensionFromBase64(myResult))
                    }, false)

                    myFileItemReader.readAsDataURL(currentFile)
                }
            }
    }

    const onFormSubmit = () => {
        if(file){
            fileUpload(file).then((response)=>{
                
                alert("Файл загружен!");
                checkImage(response.data.file_path);
                handleClearToDefault();
                // setFiles([]);
                props.showImages();
            })
        } else 
            alert("Выберите файл для загрузки !")
        
    }

    const checkImage = (name) => {
        const url = `${props.url}/images/mark/${name}`;
        fetch(url,{
            headers: {
                Authorization: `token ${sessionStorage.tokenData}`
            }
        })
        .then(res => {return res.json();})
        .then(
            data => {
                console.log('data',data);
            }
        );
    }

    const fileUpload = (file) => {
        const url = `${props.url}/images/create/`;
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

    const handleImageLoaded = (image) => {
        console.log("Image Is Loaded!!!")
        // console.log(image)
    }
    
    const handleOnCropChange = (crop) => {
        setCrop(crop);
    }

    const handleOnCropComplete = (crop, pixelCrop) =>{
        // console.log('crop = ', crop,'/ pixelCrop = ', pixelCrop)
        const canvasRef = imagePreviewCanvasRef.current
        // console.log('canvasRef = ', canvasRef)
        const curImgSrc  = imgSrc
        image64toCanvasRef(canvasRef, curImgSrc, crop)
    }

    const handleDownloadClick = (event) => {
        event.preventDefault();
        onFormSubmit();
    }

    const handleClearToDefault = event =>{
        if (event) event.preventDefault()
        const canvas = imagePreviewCanvasRef.current
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        setImgSrc(null);
        setImgSrcExt(null);
        setCrop({});

        // this.fileInputRef.current.value = null
    }

    //////////////////////////////////////////////////////////////////////////////////

    return (
        <div>
            <h1 style={{color: '#90d2c6', marginBottom:'10px'}}>Загрузка изображения</h1>
            {imgSrc !== null ? 
                <div>
                    <ReactCrop 
                        src={imgSrc} 
                        crop={crop} 
                        onImageLoaded={handleImageLoaded}
                        onComplete = {handleOnCropComplete}
                        onChange={handleOnCropChange}
                    />
                    <br/>
                    <p style={{color: '#90d2c6'}}>Выделенная часть</p>
                    <canvas
                        height='300'
                        ref={imagePreviewCanvasRef}
                        style={{color: '#90d2c6'}}
                        >Canvas not supported
                    </canvas>
                    <button onClick={handleDownloadClick}>Загрузить</button>
                    <button onClick={handleClearToDefault}>Очистить</button>
                </div>  : 
                <Dropzone 
                    onDrop={(acceptedFiles, rejectedFiles) => handleOnDrop(acceptedFiles, rejectedFiles)} 
                    maxSize={imageMaxSize}
                    multiple={false}
                    accept={acceptedFileTypes}
                    >
                    {({getRootProps, getInputProps}) => (
                        <section className="container">
                        <div {...getRootProps({className: 'dropzone'})}>
                            <input {...getInputProps()} />
                            <p style={{
                                color: '#90d2c6',
                                border: '1px dashed #90d2c6', 
                                textAlign:'center', 
                                padding: '35px 0',
                                borderRadius: '5px'
                                }}>Перетащите файл сюда или нажмите для загрузки</p>
                        </div>
                        </section>
                    )}
                </Dropzone>
            }
            <aside>
                <h4 style={{color: '#90d2c6'}}>Файл</h4>
                <ul>{files}</ul>
            </aside>
        </div>
    )
}

export default DropAndCrop;