//import logo from './assets/logo.png';
import { useNavigate, Link } from "react-router-dom";
import "../style/header.css";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { IconContext } from 'react-icons';

export default function Header({ user }) {
  const logout = () => {
    window.open("http://localhost:8080/auth/logout", "_self");
    window.localStorage.setItem("user", null);
  };
  return (
    <div id="navbar" className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Project Grizzly
        </Link>
      </span>
      {user ? (
        <>
        <a href={`/notes/`}>
            <img
              src={user.image}
              alt=""
              className="avatar"></img></a>
            <a onClick={logout}>
            <IconContext.Provider value={{className:"hover-btn"}}>
              <BiLogOut size={'1.5em'}/> </IconContext.Provider></a>
              
              </>
      ) : (
        <a style={{color:"black"}} href={`/login`}>
        <IconContext.Provider value={{className:"hover-btn"}}>
          <BiLogIn size={'1.5em'}/> </IconContext.Provider></a>
      )}
    </div>
  );
}
