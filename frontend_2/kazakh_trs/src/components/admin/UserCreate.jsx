import { useState } from "react";
import { useUsers } from "../../hooks/users";
import { Input, Button } from "../form";

export default function UserCreate () {
  const defaultFormState = {
    first_name: "",
    last_name: "",
    login: "",
    password: "",
    email: "",
    company: "",
  };

  const { createUser } = useUsers();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    ...defaultFormState,
  });

  const onChange = ({ target }) => {
    const {id , value} = target;
    setUser((user) => ({
      ...user,
      [id]: value
    }));
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    createUser(user).then(() => {
      setLoading(false);
      success();
    }).catch(({ response }) => {
      setLoading(false);
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setError("Ошибка при загрузке данных");
      }
    });
  }

  const clearForm = () => {
    setError(null);
    setUser(defaultFormState);
  }

  const success = () => {
    alert("Пользователь успешно создан");
    clearForm();
  }

  const isLoadingAndNotError = loading && !error;


  return (
    <div>
      <div className="flex flex-col justify-between mb-4">
        <div className="flex justify-between items-end my-6">
          <h1 className="my-0">Создание пользователя</h1>
        </div>
        <div className="flex flex-col">
          <Input
            className="mb-4"
            label="Компания"
            name="company"
            type="text"
            placeholder="Введите company id"
            value={user.company}
            onChange={onChange}
          />
          <Input
            className="mb-4"
            label="Имя"
            name="first_name"
            type="text"
            placeholder="Введите имя"
            value={user.first_name}
            required
            onChange={onChange}
          />
          <Input
            className="mb-4"
            label="Фамилия"
            name="last_name"
            type="text"
            placeholder="Введите фамилию"
            value={user.last_name}
            required
            onChange={onChange}
          />
          <Input
            className="mb-4"
            label="Логин"
            name="login"
            type="text"
            placeholder="Введите логин"
            required
            value={user.login}
            onChange={onChange}
          />
          <Input
            className="mb-4"
            label="email"
            name="email"
            type="text"
            placeholder="Введите email"
            required
            value={user.email}
            onChange={onChange}
          />
          <Input
            className="mb-4"
            label="Пароль"
            name="password"
            type="password"
            placeholder="Введите пароль"
            required
            value={user.password}
            onChange={onChange}
          />
          <Button
            type="submit"
            onClick={onSubmit}
            className="mt-4"
            disabled={isLoadingAndNotError}
          >
            {isLoadingAndNotError ? "Загрузка..." : "Создать"}
          </Button>
        </div>
        <div className="mt-2">
            {error ? <h2 className="text-red-500">{error}</h2> : null}
        </div>
      </div>
    </div>
  );
}
