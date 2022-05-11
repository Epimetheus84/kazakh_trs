import { nameConcat } from "./utils";
import { getUserRoleLocale } from "../../dictionary/UserRoles";

const UserCard = ({ user }) => {
  return (
    <div className="px-3 py-4 my-2 flex flex-col bg-white shadow-md rounded-lg">
      <div className="py-2">
        <span className="bg-gray-100 py-0.5 px-1.5 rounded">{ getUserRoleLocale(user.role) }</span>
        <span className="py-0.5 px-1.5">{ nameConcat(user) }</span>
      </div>
      <div className="py-2">
        <span className="py-0.5 px-1.5">email:</span>
        <span className="py-0.5 px-1.5">{ user.email }</span>
      </div>
      <div className="py-2">
        <span className="py-0.5 px-1.5">компания:</span>
        <span className="py-0.5 px-1.5">{ user.company.name }</span>
      </div>
    </div>
  );
}

export default UserCard;
