import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { DefaultLayout } from "./layouts";

export default function Home () {
  const auth = useAuth();

  return (
    <DefaultLayout>
      <Link className="text-blue-600 visited:text-purple-600 target:shadow-lg" to="/create-users">
        Create Users
      </Link>
      <br />
      <Link className="text-blue-600 visited:text-purple-600 target:shadow-lg" to="/create-users">
        Загрузка изображений
      </Link>
      <br />
      <Link className="text-blue-600 visited:text-purple-600 target:shadow-lg" to="/about">
        About
      </Link>
      <br />
      <Link className="text-blue-600 visited:text-purple-600 target:shadow-lg" to="/login">
        Login
      </Link>
      <br />
      <span
        onClick={auth.signout}
        className="cursor-pointer text-blue-600 visited:text-purple-600 target:shadow-lg"
        to="/logout"
      >
        Logout
      </span>
    </DefaultLayout>
  )
}
