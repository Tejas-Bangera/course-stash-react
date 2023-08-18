import { Link } from "react-router-dom";
import Form from "../../components/AuthForm";

const UserSignUp = () => {
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted!");
  }

  return (
    <div className="bg-white w-full max-w-md flex flex-col self-center p-10 mt-10">
      <h1>Sign Up</h1>
      <Form handleSubmit={handleSubmit} />
      <Link
        to={"/users/login"}
        className="text-xs underline self-start mt-3 text-slate-500"
      >
        Already an user? Login
      </Link>
    </div>
  );
};
export default UserSignUp;
