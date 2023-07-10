import Google from "../img/google.png";
import Github from "../img/github.png";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const google = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:8080/auth/github", "_self");
  };

  const local = async function (e) {
    e.preventDefault();
  
    const response = await fetch("http://localhost:8080/auth/local", {
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
      }
    })
    const result = response.json();
    const data = await result;
    const { redirectUrl } = data;
    if(redirectUrl === "/login/failed"){
      setUsername("");
      setPassword("");
      alert("Username/password incorrect. Please try again!");
    }
    else{
      window.location.href = redirectUrl;
    }
    
  };


  return (
    <div className="login">
      <div className="wrapper">
      <h1 className="loginTitle">Choose a Login Method</h1>
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className="submit" onClick={local}>Login</button>
          <div>Don't have an account? <a href="http://localhost:3000/signup">Sign up!</a></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
