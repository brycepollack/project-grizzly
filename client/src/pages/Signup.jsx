import { Link } from "react-router-dom";

const Signup = () => {

  return (
    <div className="login">
      <h1 className="loginTitle">Sign Up</h1>
      <div className="wrapper">
        <div className="left">
          
        </div>
        <div className="center">
            <Link to="http://localhost:3000/login" className="btn btn-secondary btn-lg">
              Back
            </Link>
        </div>
        <div className="right">
            
        </div>
      </div>
    </div>
  );
};

export default Signup;