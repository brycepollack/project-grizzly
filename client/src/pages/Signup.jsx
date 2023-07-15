import { useMutation } from "@apollo/client";
import { ADD_USER } from "../mutations/userMutations";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const [addUser] = useMutation(ADD_USER, {
        variables: { authId : username, password : password, displayName : username, },
    });
    
    const registerUser = (e) => {
        if(password !== passwordCheck){
            setUsername("");
            setPassword("");
            setPasswordCheck("");
            alert("Passwords do not match. Please try again!");
        }
        else{
            addUser().then((response) => {
                if(response.data.addUser === null){
                    setUsername("");
                    setPassword("");
                    setPasswordCheck("");
                    alert("Username already exists. Please pick a different one!");
                }
                else{
                    console.log("User created!")
                    navigate(`/login`);
                }
            });
        }
        
    };

    return (
        <div className="login">
        <h1 className="loginTitle">Sign Up</h1>
        <div className="wrapper">
            <div className="d-flex flex-column align-items-center justify-content-center">
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" placeholder="Re-enter Password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}/>
            <button className="submit" onClick={registerUser}>Register</button>
            </div>
        </div>
        </div>
    );
};

export default Signup;