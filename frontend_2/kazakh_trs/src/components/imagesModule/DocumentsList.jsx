/** Author: Eduard Eliseev */
import DropAndCrop from "./ImageEdit/DropAndCrop";
import ImagesList from "./ImagesList";
import Spinner from "../Spinner";

const DocumentsList = ({
  images = [],
  showImages = () => {},
  deleteImage = () => {},
  loading = false,
}) => {
  const confirmDeletion = (name) => {
    const doDeletion = window.confirm("Хотите удалить изображение ?");
    if (doDeletion) {
      deleteImage(name);
    }
  };

  return (
    <div className="documents__wrapper">
      <div className="documents__list">
        <DropAndCrop showImages={showImages} />
        <p className="mt-4 mb-6 mx-1 text-gray-900 text-2xl font-bold">
          Сохраненные изображения
        </p>
        {
          images.length > 0 ? (
            <ImagesList
              images={images}
              onDelete={confirmDeletion}
              // handleMapperShow={showImages}
            />
          ) : (
            loading ? (
              Spinner({
                fullScreen: true,
              })
            ) : (
              <p className="text-gray-900 text-2xl">
                Нет загруженных изображений
              </p>
            )
          )
        }
      </div>
    </div>
  );
};

export default DocumentsList;
