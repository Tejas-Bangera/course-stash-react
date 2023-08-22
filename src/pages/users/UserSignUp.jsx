import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, setUsername } from "../../store/user/userSlice";

const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost:3000/users/signup", {
        username: email,
        password,
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
    <div className="bg-white w-full max-w-md flex flex-col self-center p-10 mt-10">
      <h1>Sign Up</h1>
      <AuthForm
        {...{ email, setEmail, password, setPassword }}
        handleSubmit={handleSubmit}
      />
      <Link
        to={"/user/login"}
        className="text-xs underline self-start mt-3 text-slate-500"
      >
        Already an user? Login
      </Link>
    </div>
  );
};
export default UserSignUp;
