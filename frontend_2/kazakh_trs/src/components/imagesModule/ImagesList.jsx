import ImageBlock from "./ImageBlock";

const ImagesList = ({ images, onDelete = () => {}, handleMapperShow = () => {} }) => {
  return images.map((item, index) => {
    return (
      <ImageBlock
        key={index}
        item={item}
        onDelete={onDelete}
        handleMapperShow={handleMapperShow}
      />
    );
  });
};

export default ImagesList;
