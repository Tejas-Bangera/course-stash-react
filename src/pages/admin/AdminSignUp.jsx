import Form from "../../components/AuthForm";
import AdminLoginBanner from "../../components/AdminLoginBanner";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  login as adminLogin,
  logout as adminLogout,
  setUsername as setAdminUsername,
} from "../../store/admin/adminSlice";
import {
  logout as userLogout,
  setUsername,
} from "../../store/admin/adminSlice";
import ErrorAlert from "../../components/ErrorAlert";

const AdminSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toggleError, setToggleError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong!");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();

    // Logout previous user
    dispatch(userLogout());
    dispatch(setUsername(""));
    localStorage.removeItem("user-token");

    // Logout previous admin
    dispatch(adminLogout());
    dispatch(setAdminUsername(""));
    localStorage.removeItem("admin-token");

    axios
      .post("http://localhost:3000/admin/signup", {
        username: email,
        password,
      })
      .then((response) => {
        localStorage.setItem("admin-token", "Bearer " + response.data.token);
        dispatch(setUsername(email));
        dispatch(adminLogin());
        setEmail("");
        navigate("/admin/courses");
      })
      .catch((err) => {
        console.log(err);
        setToggleError(true);
        setErrorMessage("Something went wrong!");
      });
  }

  function toggle() {
    setToggleError((prev) => !prev);
  }

  return (
    <>
      {toggleError && <ErrorAlert message={errorMessage} toggle={toggle} />}
      <div className="flex flex-col section-padding lg:flex-row items-center lg:justify-center lg:items-start gap-8 w-full">
        <div className="bg-white flex flex-col p-10 w-full max-w-md">
          <h1>Sign Up</h1>
          <Form
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
        </div>
        <AdminLoginBanner />
      </div>
    </>
  );
};
export default AdminSignUp;
