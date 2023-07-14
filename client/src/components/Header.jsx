//import logo from './assets/logo.png';
import { useNavigate, Link } from "react-router-dom";
import "../style/header.css";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { IconContext } from 'react-icons';
import GrizzlyIcon from "../img/grizzlyicon.png";

export default function Header({ user, isDev }) {

  const API_BASE_URL = isDev ? 'http://localhost:8080' : 'https://grizzly.fly.dev';
  //const API_BASE_URL = 'http://localhost:8080';
  console.log("HEADER api base url: " + API_BASE_URL)

  const logout = () => {
    window.open(API_BASE_URL + "/auth/logout", "_self");
    window.localStorage.setItem("user", null);
  };
  return (
    <div id="navbar" className="navbar">
      <Link className="link" to="/">
        <img src={GrizzlyIcon} className="grizzlyicon"/>
      </Link>
      <span className="logo">
        <Link className="link" to="/">
          Grizzly
        </Link>
      </span>
      {user ? (
        <>
        <a href={`/home`} style={{ color: "inherit"}}>{user.displayName}</a>
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
