import { dateHuman } from "../../utils/helpers";
import { IoMdOpen } from "react-icons/io";

const FileInfo = ({ item }) => {
  return (
    <div>
      <div>
        <b className="text-gray-700">Загрузил: </b>
        <span className="text-lg bg-gray-100 py-0.5 px-1.5 rounded">
          {item.uploaded_by}
        </span>
      </div>
      <div className="mb-1">
        <b className="text-gray-700">Файл: </b>
        <a
          className="link"
          href={`/api${item.file_url}`}
          target="_blank"
          rel="noreferrer"
        >
          <span className="text-sm">
            {item.original_filename} <IoMdOpen className="inline" />
          </span>
        </a>
      </div>
      <div>
        <b className="text-gray-700">Дата: </b>
        <time className="text-md text-gray-600">
          {dateHuman(item.date_created)}
        </time>
      </div>
    </div>
  );
};

export default FileInfo;
