import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login, setUsername } from "../../store/user/userSlice";
import ErrorAlert from "../../components/ErrorAlert";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggleError, setToggleError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong!");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post(`${import.meta.env.VITE_NODE_URL}/users/login`, null, {
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
        setToggleError(false);
        navigate("/");
      })
      .catch((error) => {
        setToggleError(true);
        if (error.code === "ERR_NETWORK") {
          setErrorMessage("Something went wrong!");
        } else if (error.code === "ERR_BAD_REQUEST") {
          setErrorMessage("Invalid credentials");
        }
      });
  }

  function toggle() {
    setToggleError((prev) => !prev);
  }

  return (
    <>
      {toggleError && <ErrorAlert message={errorMessage} toggle={toggle} />}
      <div className="bg-white w-full max-w-md flex flex-col p-10 mt-10 self-center">
        <h1>Login</h1>
        <AuthForm
          {...{ email, setEmail, password, setPassword }}
          handleSubmit={handleSubmit}
        />
        <Link
          to={"/user/signup"}
          className="text-xs underline self-start mt-3 text-slate-500"
        >
          Don't have an account? Signup
        </Link>
      </div>
    </>
  );
};
export default UserLogin;
