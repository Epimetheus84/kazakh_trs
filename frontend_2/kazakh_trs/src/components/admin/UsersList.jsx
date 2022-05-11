import { useState } from "react";
import { useEffect } from "react";
import { useUsers } from "../../hooks/users";
import { nameConcat } from "./utils";
import UserCard from "./UserCard";
import { Input } from "../form";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";

export default function UsersList() {
  const { users , getUsersList } = useUsers();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);


  const filters = {
    byName: (a, b) => {
      return nameConcat(a).localeCompare(nameConcat(b));
    }
  };

  useEffect(() => {
    setLoading(true);
    getUsersList().then(() => {
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      setError("Ошибка при загрузке данных");
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      console.log("users", users);
      const sortedUsers = users.sort(filters.byName);
      if (search === "") {
        setFilteredUsers(sortedUsers);
      } else {
        const filtered = sortedUsers.filter(user => {
          return nameConcat(user).toLowerCase().includes(search.toLowerCase())
        });
        setFilteredUsers(filtered);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, users]);

  const onSearch = (e) => {
    setSearch(e.target.value);
  }

  const isLoadingAndNotError = loading && !error;

  return (
    <div>
      <div className="flex flex-col justify-between mb-4">
        <div className="flex justify-between items-end my-6">
          <h1 className="my-0">Список пользователей</h1>
          <Link to="/user-create" className="text-blue-600 hover:text-blue-400 my-0">
            создать нового пользователя
          </Link>
        </div>
        <Input type="text" placeholder="Поиск" onChange={onSearch} />
      </div>
      {isLoadingAndNotError ? (
        Spinner({
          fullScreen: true,
        })
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {filteredUsers.length > 0 &&
            <ul>
              {filteredUsers.map(user => {
                return (
                  <li key={user.login}>
                    <UserCard user={user}/>
                  </li>
                );
              })}
            </ul>
          }
          {filteredUsers.length === 0 &&
            <div>Нет пользователей</div>
          }
        </div>
      )}
    </div>
  );
}
