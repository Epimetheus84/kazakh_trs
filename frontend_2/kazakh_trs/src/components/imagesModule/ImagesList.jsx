import { FaTrashAlt } from "react-icons/fa";
import { IoMdOpen } from "react-icons/io";

const ImagesList = ({ images, onDelete, handleMapperShow }) => {
  const dateHuman = (date) => {
    const dateObj = new Date(date * 1000);

    const [day, month, year, hours, minutes] = [
      dateObj.getDate(),
      dateObj.getMonth() + 1,
      dateObj.getFullYear(),
      dateObj.getHours(),
      dateObj.getMinutes(),
    ];

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  return images.map((item, index) => {
    return (
      <div
        className="
        bg-gray-200 border border-gray-300 rounded-sm my-4
        p-4 flex justify-between
        "
        key={index}
      >
        <div>
          <div>
            <b>Загрузил: </b>
            {item.uploaded_by}
          </div>
          <div>
            <b>Файл: </b>
            <a
              className="link"
              href={`/api${item.file_url}`}
              target="_blank"
              rel="noreferrer"
            >
              {item.original_filename} <IoMdOpen className="inline" />
            </a>
          </div>
          <div>
            <b>Дата: </b>
            {dateHuman(item.date_created)}
          </div>
        </div>
        <div className="flex">
          {item.coordinates && (
            <button
              className="
              bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md
              text-lg
              "
              onClick={() => handleMapperShow(item)}
            >
              <span>
                {item.status === 3 ? "Текст определен" : "Показать координаты"}
              </span>
            </button>
          )}
          <button
            className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md ml-4"
            onClick={() => onDelete(item.file_path)}
          >
            <FaTrashAlt className="text-red-400" />
          </button>
        </div>
      </div>
    );
  });
};

export default ImagesList;
