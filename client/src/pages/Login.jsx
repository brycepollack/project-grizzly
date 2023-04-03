import { FaGoogle } from "react-icons/fa";

export default function Login() {
  const google = () => {
    window.open("http://localhost:8080/auth/google", "_self");
  };

  return (
    <>
      <button onClick={google} type="login" className="btn btn-primary">
        <FaGoogle /> Login with Google
      </button>
    </>
  );
}
