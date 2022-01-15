/** Author: Eduard Eliseev */
import DropAndCrop from "./ImageEdit/DropAndCrop";
import ImagesList from "./ImagesList";
// const url = `${window.location.origin}/api`;

const DocumentsList = ({
  images = [],
  showImages = () => {},
  deleteImage = () => {},
}) => {
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
        {/* <DropAndCrop url={url} showImages={showImages} /> */}
        <p className="my-4 mx-1 text-gray-900 text-2xl">
          <b>
            Сохраненные изображения
          </b>
        </p>
        {
          images.length > 0 ? (
            <ImagesList
              images={images}
              onDelete={confirmDeletion}
              // handleMapperShow={showImages}
            />
          ) : (
            <p className="text-gray-900 text-2xl">
              Нет загруженных изображений
            </p>
          )
        }
      </div>
    </div>
  );
};

export default DocumentsList;
