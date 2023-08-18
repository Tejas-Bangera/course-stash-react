import Form from "../../components/AuthForm";
import AdminSignUpBanner from "../../components/AdminSignUpBanner";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setUsername } from "../../store/admin/adminSlice";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:3000/admin/login", null, {
        headers: {
          username: email,
          password,
        },
      })
      .then((response) => {
        localStorage.setItem("admin-token", "Bearer " + response.data.token);
        dispatch(setUsername(email));
        dispatch(login());
        setEmail("");
        navigate("/admin/courses");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="flex flex-col items-center section-padding lg:flex-row lg:justify-center lg:items-start gap-8 w-full">
      <div className="bg-white flex flex-col p-10 w-full max-w-md">
        <h1>Login</h1>
        <Form
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      </div>
      <AdminSignUpBanner />
    </div>
  );
};
export default AdminLogin;
