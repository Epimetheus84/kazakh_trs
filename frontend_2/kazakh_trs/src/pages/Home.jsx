import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
export default function Home () {
  const auth = useAuth();

  return (
    <>
      <h1>Home</h1>
      <p>This is the home page.</p>
      <Link className="text-blue-600 visited:text-purple-600 target:shadow-lg" to="/about">
        About
      </Link>
      <br />
      <Link className="text-blue-600 visited:text-purple-600 target:shadow-lg" to="/login">
        Login
      </Link>
      <br />
      <span onClick={auth.signout} className="text-blue-600 visited:text-purple-600 target:shadow-lg" to="/logout">
        Logout
      </span>
    </>
  )
}
