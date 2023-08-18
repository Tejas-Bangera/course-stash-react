import { useDispatch, useSelector } from "react-redux";
import Brand from "./Brand";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/admin/adminSlice";

const Navbar = () => {
  const { username, isLoggedIn } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout(event) {
    event.preventDefault();
    dispatch(logout());
    localStorage.removeItem("admin-token");
    navigate("/");
  }

  return (
    // <div className="bg-white flex items-center justify-between py-4 px-3 shadow-md mb-3 w-full max-w-screen-2xl self-center">
    <header className="bg-white w-full shadow-md p-4">
      <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto">
        <Brand />
        <nav>
          <ul className="flex items-center gap-x-4">
            {!isLoggedIn ? (
              <>
                <li>
                  <NavLink to={"admin/login"} className="underline">
                    Instructor?
                  </NavLink>
                </li>
                <li>
                  <NavLink to="users/login" className="secondary-button">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"users/signup"} className="primary-button">
                    Signup
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="text-sm">{username}</li>
                <li>
                  <button className="secondary-button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
