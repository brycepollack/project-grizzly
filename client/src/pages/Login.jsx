import Google from "../img/google.png";
import Github from "../img/github.png";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import "../style/newlogin.css";

const Login = ({isDev}) => {

  const API_BASE_URL = isDev ? 'http://localhost:8080' : 'https://grizzly.fly.dev';
  //const API_BASE_URL = 'http://localhost:8080';
  console.log("LOGIN api base url: " + API_BASE_URL)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const google = () => {
    window.open(API_BASE_URL + "/auth/google", "_self");
  };

  const github = () => {
    window.open(API_BASE_URL + "/auth/github", "_self");
  };

  const local = async function (e) {
    e.preventDefault();

    const response = await fetch(API_BASE_URL + "/auth/local", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const result = response.json();
    const data = await result;
    const { redirectUrl } = data;
    if (redirectUrl === "/login/failed") {
      setUsername("");
      setPassword("");
      alert("Username/password incorrect. Please try again!");
    } else {
      window.location.href = redirectUrl;
    }
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Welcome back!</h1>
      <div className="wrapper">
        <div className="right">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="submit" onClick={local}>
            Login
          </button>
        </div>

        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>

        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
          <div className="signup">
            Don't have an account?{" "}
            <a href="http://localhost:3000/signup">Sign up!</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
