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

function DropAndCrop() {
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
        acceptedFiles.map(file => (
            setFiles(
                <li key={file.path}>
                    {file.path} - {file.size} bytes
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

        const handleImageLoaded = (image) => {
            // console.log(image)
        }
        const handleOnCropChange = (crop) => {
            setCrop(crop);
        }
        const handleOnCropComplete = (crop, pixelCrop) =>{
            console.log('crop = ', crop,'/ pixelCrop = ', pixelCrop)
    
            const canvasRef = imagePreviewCanvasRef.current
            console.log('canvasRef = ', canvasRef)
            const curImgSrc  = imgSrc
            image64toCanvasRef(canvasRef, curImgSrc, crop)
        }

        const handleDownloadClick = (event) => {
            event.preventDefault()
            const curImgSrc  = imgSrc
            if (curImgSrc) {
                const canvasRef = imagePreviewCanvasRef.current
            
                const curImgSrcExt =  imgSrcExt
                const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt)
    
          
                const myFilename = "previewFile." + curImgSrcExt
    
                // file to be uploaded
                const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
                console.log('myNewCroppedFile', myNewCroppedFile)
                // download file
                downloadBase64File(imageData64, myFilename)
                handleClearToDefault()
            }
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

        const handleSubmitCom = (event) => {
            const {
                companyName,
                info
            } = this.state;
            const sessionToken = `token ${sessionStorage.tokenData}`;
    
            axios.post('http://26.140.14.182:4444/companies/create/', 
            {
                    name: companyName,
                    info: info,
            },{
                headers: {
                    Authorization: sessionToken
                }
            },
            {withCredentials: true}
            ).then(response => {
                if(response.status === 200){
                    this.props.showRegisterCompany();
                }
            }).catch(error=>{
                console.log("Company registration error", error);
            })
    
            console.log("form submitted");
            event.preventDefault();
        }

        //////////////////////////////////////////////////////////////////////////////////

        return (
            <div>
                <h1>Drop and crop</h1>
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
                        <p>Preview crop image</p>
                        <canvas
                            height='300'
                            ref={imagePreviewCanvasRef}
                            >Canvas not supported
                        </canvas>
                        <button onClick={handleDownloadClick}>Download</button>
                        <button onClick={handleClearToDefault}>Clear</button>
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
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                            </section>
                        )}
                    </Dropzone>
                }
                <aside>
                    <h4>Files</h4>
                    <ul>{files}</ul>
                </aside>
            </div>
        )
}

export default DropAndCrop;