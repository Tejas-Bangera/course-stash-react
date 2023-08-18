import { NavLink } from "react-router-dom";

const AdminSignUpBanner = () => {
  return (
    <div className="p-5 bg-white flex flex-col gap-y-3 border w-full max-w-md h-max">
      <h1>Want to become an instructor at CS?</h1>
      <p>Haven't joined Course Stash yet? Join now.</p>
      <NavLink to={"/admin/signup"} className="primary-button w-fit">
        Sign Up
      </NavLink>
    </div>
  );
};
export default AdminSignUpBanner;
