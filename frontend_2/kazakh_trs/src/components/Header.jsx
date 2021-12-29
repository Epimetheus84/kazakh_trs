import { useAuth } from "../hooks/use-auth";
import { HiUserCircle } from "react-icons/hi";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  useLocation
} from "react-router-dom";

function BackButton() {
  const { pathname } = useLocation();

  return pathname !== '/' && (
    <Link to="/" className="text-gray-200 hover:text-gray-400">
        <BsFillArrowLeftCircleFill className="inline-block mr-2" />
        Назад
      </Link>
  );
}

function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-gray-500">
      <nav className="container flex items-center justify-between flex-wrap p-1">
        <HiUserCircle
          className="text-gray-200 cursor-pointer hover:text-gray-400"
          style={{
            height: '25px',
            width: '25px',
            color: '#fff'
          }}
          onClick={() => {
            console.log(user);
          }}
        />
        <BackButton />
      </nav>
    </header>
  );
}

export default Header;
