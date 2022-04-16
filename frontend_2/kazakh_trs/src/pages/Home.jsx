import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { DefaultLayout } from "./layouts";

export default function Home () {
  const auth = useAuth();

  return (
    <DefaultLayout>
      <Link className="link" to="/create-users">
        Create Users
      </Link>
      <br />
      <Link className="link" to="/load-documents">
        Загрузка изображений
      </Link>
      <br />
      <Link className="link" to="/about">
        About
      </Link>
      <br />
      <Link className="link" to="/login">
        Login
      </Link>
      <br />
      <span
        onClick={auth.signout}
        className="cursor-pointer link"
        to="/logout"
      >
        Logout
      </span>
    </DefaultLayout>
  )
}
