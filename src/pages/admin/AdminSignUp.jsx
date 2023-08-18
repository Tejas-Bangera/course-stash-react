import Form from "../../components/AuthForm";
import AdminLoginBanner from "../../components/AdminLoginBanner";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:3000/admin/signup", {
        username: email,
        password,
      })
      .then((response) => {
        localStorage.setItem("admin-token", "Bearer " + response.data.token);
        dispatch(setUsername(email));
        dispatch(login());
        setEmail("");
        navigate("/admin/courses");
      })
      .catch((err) => console.log(err));
  }

  return (
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
  );
};
export default AdminSignUp;
