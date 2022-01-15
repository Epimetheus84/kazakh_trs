
export const prepareItemForMapper = (item) => {
  return {
    coords: JSON.parse(item.coordinates),
    url: item.file_url,
    size: JSON.parse(item.image_size),
    name: item.file_path,
    text: item.text,
  };
};
