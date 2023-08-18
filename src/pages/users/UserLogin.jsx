import { Link } from "react-router-dom";
import Form from "../../components/AuthForm";

const UserLogin = () => {
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted!");
  }

  return (
    <div className="bg-white w-full max-w-md flex flex-col p-10 mt-10 self-center">
      <h1>Login</h1>
      <Form handleSubmit={handleSubmit} />
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
