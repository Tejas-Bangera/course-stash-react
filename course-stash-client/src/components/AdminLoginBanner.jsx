import { NavLink } from "react-router-dom";

const AdminLoginBanner = () => {
  return (
    <div className="p-5 bg-white flex flex-col gap-y-3 border w-full max-w-md h-max">
      <h1>Already an instructor at CS?</h1>
      <p>Login and start creating content.</p>
      <NavLink to={"/admin/login"} className="primary-button w-fit">
        Login
      </NavLink>
    </div>
  );
};
export default AdminLoginBanner;
