/** Author: Eduard Eliseev */
import { useState } from "react";
import DropAndCrop from "./ImageEdit/DropAndCrop";
import Mapper from "./imageMapping/Mapper";
import ImagesList from "./ImagesList";
import { compose } from "../../utils/functional";
const url = `${window.location.origin}/api`;

const DocumentsList = ({
  images = [],
  showImages = () => {},
  deleteImage = () => {},
}) => {
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

  const handleMapperShow = compose(prepareItemForMapper, mapperShow, () => {
    setShowMapper(!showMapper);
  });

  const closeMapper = () => {
    setShowMapper(false);
  };

  const confirmDeletion = (name) => {
    const doDeletion = window.confirm("Хотите удалить изображение ?");
    if (doDeletion) {
      deleteImage(name);
    }
  };

  return (
    <div className="documents__wrapper">
      <h2>Загруженные документы:</h2>
      <div className="documents__list">
        <DropAndCrop url={url} showImages={showImages} />
        <hr />
        <p className="mt-4 text-blue-800 text-lg">Сохраненные изображения</p>
        {showMapper && (
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
        )}
        <ImagesList
          images={images}
          handleMapperShow={handleMapperShow}
          onDelete={confirmDeletion}
        />
      </div>
    </div>
  );
};

export default DocumentsList;
