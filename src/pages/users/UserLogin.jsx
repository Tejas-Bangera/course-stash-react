import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login, setUsername } from "../../store/user/userSlice";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3000/users/login", null, {
        headers: {
          username: email,
          password,
        },
      })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("user-token", "Bearer " + token);
        dispatch(setUsername(email));
        dispatch(login());
        navigate("/");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="bg-white w-full max-w-md flex flex-col p-10 mt-10 self-center">
      <h1>Login</h1>
      <AuthForm
        {...{ email, setEmail, password, setPassword }}
        handleSubmit={handleSubmit}
      />
      <Link
        to={"/users/signup"}
        className="text-xs underline self-start mt-3 text-slate-500"
      >
        Don't have an account? Signup
      </Link>
    </div>
  );
};
export default UserLogin;
