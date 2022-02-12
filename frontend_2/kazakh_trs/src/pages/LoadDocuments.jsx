import { useState, useEffect } from "react";
import { DefaultLayout } from "./layouts";
import DocumentsList from "../components/imagesModule/DocumentsList";
import ImageService from "../services/ImageService";

export default function LoadDocuments() {
  const [imagesList, setImagesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = {
    byDate: (a, b) => {
      return new Date(b.date_created) - new Date(a.date_created);
    },
    byName: (a, b) => {
      return a.original_filename.localeCompare(b.original_filename);
    },
  };

  const showImages = async () => {
    setLoading(true);
    try {
      const imagesData = await ImageService.getImagesList();
      console.log("imagesData", imagesData);
      const sortedImages = imagesData.sort(filters.byDate);
      setImagesList(sortedImages);
    } catch {
      console.log("fetch images list error");
    }
    setLoading(false);
  };

  const deleteImageHandler = async (imageName) => {
    try {
      const deleteImage = await ImageService.deleteImage(imageName);
      console.log("deleteImage", deleteImage);
      showImages();
    } catch {
      console.log("delete image error");
    }
  };

  useEffect(() => {
    showImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DefaultLayout>
      <DocumentsList
        images={imagesList}
        showImages={showImages}
        deleteImage={deleteImageHandler}
        loading={loading}
      />
    </DefaultLayout>
  );
}
