import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { DefaultLayout } from "./layouts";

export default function Home () {
  const auth = useAuth();

  return (
    <DefaultLayout>
      {auth.user.role === 10 && (
        <div>
          <Link className="link" to="/users-list">
            Управление пользователями
          </Link>
          <br />
        </div>
      )}
      <Link className="link" to="/load-documents">
        Загрузка изображений
      </Link>
      <br />
      {
        (typeof auth.user === 'undefined') && (
          <div>
            <Link className="link" to="/login">
              Вход
            </Link>
            <br />
          </div>
        )
      }
      <span
        onClick={auth.signout}
        className="cursor-pointer link"
        to="/logout"
      >
        Выход
      </span>
    </DefaultLayout>
  )
}
