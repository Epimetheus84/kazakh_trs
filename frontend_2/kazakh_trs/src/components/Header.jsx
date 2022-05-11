import { useAuth } from "../hooks/use-auth";
import { HiUserCircle } from "react-icons/hi";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  useLocation
} from "react-router-dom";

function BackButton() {
  const { pathname } = useLocation();
  const classes = `text-gray-200 hover:text-gray-400 ${ pathname === '/' ? 'opacity-0 cursor-default' : '' }`;

  return (
    <Link to="/" className={classes}>
        <BsFillArrowLeftCircleFill className="inline-block mr-2" />
        <span>
          Назад
        </span>
      </Link>
  );
}

function Header() {
  const { user, signout } = useAuth();

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
        <div className="flex items-center">
          {user.role === 10 && (
            <div>
              <Link className="text-gray-200 hover:text-gray-400 px-2" to="/users-list">
                Управление пользователями
              </Link>
              <br />
            </div>
          )}
          <Link className="text-gray-200 hover:text-gray-400 px-2" to="/load-documents">
            Загрузка изображений
          </Link>
          <br />
          {
            (typeof user === 'undefined') && (
              <div>
                <Link className="text-gray-200 hover:text-gray-400 px-2" to="/login">
                  Вход
                </Link>
                <br />
              </div>
            )
          }
          <span
            onClick={signout}
            className="cursor-pointer text-gray-200 hover:text-gray-400 px-2"
            to="/logout"
          >
            Выход
          </span>
        </div>
        <BackButton />
      </nav>
    </header>
  );
}

export default Header;
