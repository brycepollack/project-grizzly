//import logo from './assets/logo.png';
import { useNavigate, Link } from "react-router-dom";

export default function Header({ user }) {
  const navigate = useNavigate();

  const toLoginPage = () => {
    const path = "/login";
    navigate(path);
  };

  const logout = () => {
    window.open("http://localhost:8080/auth/logout", "_self");
    window.localStorage.setItem("user", null);
  };

  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="navbar-brand">
        <Link to="/">ProjectGrizzly</Link>
      </div>
      {user === null ? (
        <div className="d-flex">
          <button className="btn btn-secondary" onClick={toLoginPage}>
            Login
          </button>
        </div>
      ) : (
        <div className="d-flex">
          <div>{user.displayName}</div>
          <button className="btn btn-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
