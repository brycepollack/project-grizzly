//import logo from './assets/logo.png';
import { useNavigate, Link } from "react-router-dom";
import "../style/header.css";

export default function Header({ user }) {
  const logout = () => {
    window.open("http://localhost:8080/auth/logout", "_self");
    window.localStorage.setItem("user", null);
  };
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Project Grizzly
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">
            <img
              src={user.image}
              alt=""
              className="avatar"
            />
          </li>
          <li className="listItem">{user.displayName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
}
