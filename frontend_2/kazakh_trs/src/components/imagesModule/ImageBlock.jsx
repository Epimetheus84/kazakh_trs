import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Mapper from "./ImageMapping/Mapper";
import FileInfo from "./FileInfo";
import { compose } from "../../utils/functional";
import { Button } from "../form";
import ImageService from '../../services/ImageService';

const ImageBlock = ({ item, onDelete = () => {}, externalSetMapperShow = () => {} }) => {
  const [showMapper, setShowMapper] = useState(false);
  const [coords, setCoords] = useState([]);
  const [imgSrc, setImgSrc] = useState("");
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHight] = useState(0);
  const [imgName, setImgName] = useState("");
  const [imgText, setImgText] = useState("");

  const prepareItemForMapper = (item) => {
    return {
      coords: JSON.parse(item.coordinates),
      url: item.file_url,
      size: JSON.parse(item.image_size),
      name: item.file_path,
      text: item.text,
    };
  };

  const mapperShow = ({ coords, url, size, name, text }) => {
    setCoords(coords);
    setImgSrc(url);
    setImgWidth(size.width);
    setImgHight(size.height);
    setImgName(name);
    setImgText(text);
    return null;
  };

  const handleMapperShow = compose(
    prepareItemForMapper,
    mapperShow,
    () => {
      setShowMapper(!showMapper);
      externalSetMapperShow(showMapper);
    }
  );

  const closeMapper = () => {
    setShowMapper(false);
    externalSetMapperShow(false);
  };

  const findCoords = async () => {
    await ImageService.findCoordinates(item.file_path)
  };

  return (
    <div
      className="
      bg-white shadow-md rounded-lg px-5 pt-6 pb-8 mb-4
        flex flex-col mx-1.5 md:mx-0
      "
    >
      <div className="flex flex-col md:flex-row justify-between">
        <FileInfo item={item} />
        <div className="flex mt-3 md:mt-0 items-end">
          {item.coordinates && (
            <Button onClick={() => handleMapperShow(item)}>
              {showMapper ? "скрыть" : (
                item.status === 3 ? "тект определён" : "показать координаты"
              )}
            </ Button>
          )}
          {!item.coordinates && (
            <Button onClick={findCoords}>
              определить координаты
            </ Button>
          )}
          <button
            className="
            bg-red-200 hover:bg-red-400 text-white font-bold p-3 rounded-md ml-4
            "
            onClick={() => onDelete(item.file_path)}
          >
            <FaTrashAlt className="text-red-600" />
          </button>
        </div>
      </div>
      {
        showMapper && (
          <>
            <div
              className="my-4 bg-gray-300 rounded-md"
              style={{
                height: '3px'
              }}
            >
            </div>
            <Mapper
              coordinates={coords}
              imgSrc={imgSrc}
              width={imgWidth}
              height={imgHeight}
              imgName={imgName}
              imgText={imgText}
              setImgText={setImgText}
              closeMapper={closeMapper}
            />
          </>
        )
      }
    </div>
  );
};

export default ImageBlock;
