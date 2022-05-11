import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Dropzone from "react-dropzone";
import { FaUpload, FaTrashAlt } from "react-icons/fa";
import { AiFillInfoCircle } from "react-icons/ai";
import {
  extractImageFileExtensionFromBase64,
  getCroppedImg,
  getFileFromUrl,
} from "./ReusableUtils";
import ImageService from "../../../services/ImageService";
import { Button } from "../../form";
import { fileSizeToHuman } from "../../../utils/helpers";

const imageMaxSize = 100000000;
const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
  return item.trim();
});

function DropAndCrop(props) {
  const [files, setFiles] = useState([]);
  const [imgSrc, setImgSrc] = useState(null);
  const [imageRef, setImageRef] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [, setImgSrcExt] = useState(null);
  const [crop, setCrop] = useState({});
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const verifyFile = (file) => {
    if (file && file.length > 0) {
      const currentFile = file[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > imageMaxSize) {
        alert(
          "Image file is not allowed. " +
            currentFileSize +
            " bytes is too large"
        );
        return false;
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alert("This file is not allowed. Only images are allowed.");
        return false;
      }
      return true;
    }
  };

  const getFileHtmlTemplate = (file) => (
    <li key={file.name}>
      <span>{file.name}</span> - <span>{fileSizeToHuman(file.size)}</span>
    </li>
  );

  const readFile = (file) => {
    setFile(file);
    const myFileItemReader = new FileReader();
    myFileItemReader.addEventListener(
      "load",
      () => {
        const myResult = myFileItemReader.result;
        setImgSrc(myResult);
        setImgSrcExt(extractImageFileExtensionFromBase64(myResult));
      },
      false
    );

    myFileItemReader.readAsDataURL(file);
  };

  const handleOnDrop = (acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      setFileName(file.path);
      setFiles(getFileHtmlTemplate(file));
    });
    if (rejectedFiles && rejectedFiles.length > 0) {
      verifyFile(rejectedFiles);
    }
    if (acceptedFiles && acceptedFiles.length > 0) {
      const isVerified = verifyFile(acceptedFiles);
      if (isVerified) {
        // imageBase64Data
        const currentFile = acceptedFiles[0];
        readFile(currentFile);
      }
    }
  };

  const timerStatus = (name) => {
    setInterval(() => checkImage(name), 10000);
    console.log("Check status");
  };
  const handleDownloadClick = async (event) => {
    event.preventDefault();
    if (file) {
      try {
        const data = await ImageService.uploadImage(file);

        findCoords(data.file_path);
        handleClearToDefault();
        props.showImages();
        timerStatus(data.file_path);

        alert("Файл загружен!");
      } catch (error) {
        console.log("error", error);
      }
    } else alert("Выберите файл для загрузки !");
  };

  const findCoords = async (name) => {
    try {
      const data = await ImageService.findCoords(name);
      console.log("findCoords: result", data);
    } catch (error) {
      console.log("findCoords: error", error);
    }
  };

  const checkImage = async (name) => {
    try {
      const data = await ImageService.checkImage(name);
      console.log("checkImage: result", data);
      if (data.status === 1) {
        props.showImages();
        clearInterval(timerStatus);
      }
    } catch (error) {
      console.log("checkImage: error", error);
    }
  };

  const handleOnCropChange = (crop) => {
    setCrop(crop);
  };

  const onImageLoaded = (image) => {
    console.log('imageLoaded', image);
    setImageRef(image);
  };

  const handleOnCropComplete = async (crop) => {
    console.log('on crop complete(crop, percentCrop):', crop);
    if (imageRef && crop.width && crop.height) {
      const croppedUrl = await getCroppedImg(
        imageRef,
        crop,
        'newfile.jpg',
        croppedImageUrl
      );
      setCroppedImageUrl(croppedUrl);
    }
  };

  const handleClearToDefault = (event) => {
    if (event) event.preventDefault();

    setImgSrc(null);
    setImgSrcExt(null);
    setCrop({});
  };

  const handleCroppedImageClick = async (event) => {
    event.preventDefault();

    const file = await getFileFromUrl(croppedImageUrl, fileName);
    setFile(file);
    setFiles(getFileHtmlTemplate(file));
    readFile(file);
    window.URL.revokeObjectURL(croppedImageUrl);
    setCroppedImageUrl(null);
    setCrop({});
  };
  //////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="bg-white shadow-md rounded-lg px-5 pt-6 pb-8 mb-4 flex flex-col mx-1.5 md:mx-0">
      <p className="mb-6 text-gray-900 text-2xl font-bold">
        Загрузка изображения
      </p>
      {imgSrc !== null ? (
        <div>
          <ReactCrop
            name="image-crop"
            src={imgSrc}
            crop={crop}
            onImageLoaded={onImageLoaded}
            onComplete={handleOnCropComplete}
            onChange={handleOnCropChange}
          />
          <br />
          {croppedImageUrl && (
            <div className="flex flex-col flex-wrap items-center py-1">
            <p
              style={{
                color: "#374151",
                fontWeight: 600,
              }}
              className="py-1.5"
            >
              {crop.width ? (
                <span>Выделенная часть</span>
              ) : (
                <span>
                  <AiFillInfoCircle style={{ display: "inline-block" }} />
                  &nbsp; Вы можете выбрать область на изображении для обрезки
                </span>
              )}
            </p>
            <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
            <div className="mt-2">
              {crop.width ? (
                <div>
                <span className="bg-gray-100 py-0.5 px-1.5 rounded font-semibold">
                  {Number(crop.width).toFixed(2)}
                  {crop.unit} X {Number(crop.height).toFixed(2)}
                  {crop.unit}
                </span>
                <Button onClick={handleCroppedImageClick}>
                  обрезать
                </Button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          )}
        </div>
      ) : (
        <Dropzone
          onDrop={(acceptedFiles, rejectedFiles) =>
            handleOnDrop(acceptedFiles, rejectedFiles)
          }
          maxSize={imageMaxSize}
          multiple={false}
          accept={acceptedFileTypes}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p
                  style={{
                    color: "#374151",
                    border: "1px dashed #374151",
                    textAlign: "center",
                    padding: "35px 0",
                    borderRadius: "5px",
                  }}
                >
                  <FaUpload style={{ display: "inline-block" }} />
                  &nbsp; Перетащите файл сюда или нажмите для загрузки
                </p>
              </div>
            </section>
          )}
        </Dropzone>
      )}
      <aside className="mt-3">
        {imgSrc !== null ? (
          <div className="flex flex-wrap items-center py-5">
            <div>
              <ul>{files}</ul>
            </div>
            <div className="flex pl-3 justify-items-start	items-center	">
              <Button onClick={handleDownloadClick}>Загрузить</Button>
              <button
                className="svg__button svg__button--remove p-1 pl-2"
                onClick={handleClearToDefault}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </aside>
    </div>
  );
}

export default DropAndCrop;
