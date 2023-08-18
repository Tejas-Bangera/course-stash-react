import { useDispatch, useSelector } from "react-redux";
import Brand from "./Brand";
import { NavLink, useNavigate } from "react-router-dom";
import { logout as adminLogout } from "../store/admin/adminSlice";
import { logout as userLogout } from "../store/user/userSlice";

const Navbar = () => {
  const { username: adminUsername, isLoggedIn: isAdminLoggedIn } = useSelector(
    (state) => state.admin
  );
  const { username, isLoggedIn: isUserLoggedIn } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout(event) {
    event.preventDefault();
    dispatch(isAdminLoggedIn ? adminLogout() : userLogout());
    localStorage.removeItem(isAdminLoggedIn ? "admin-token" : "user-token");
    navigate("/");
  }

  return (
    // <div className="bg-white flex items-center justify-between py-4 px-3 shadow-md mb-3 w-full max-w-screen-2xl self-center">
    <header className="bg-white w-full shadow-md p-4">
      <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto">
        <Brand />
        <nav>
          <ul className="flex items-center gap-x-4">
            {isAdminLoggedIn ? (
              <>
                <li className="text-sm">{adminUsername}</li>
                <li>
                  <button className="secondary-button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : isUserLoggedIn ? (
              <>
                <li className="text-sm">{username}</li>
                <li>
                  <NavLink to={"user/courses"} className="underline">
                    My Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink to={"user/cart"} className="secondary-button">
                    Cart
                  </NavLink>
                </li>
                <li>
                  <button className="secondary-button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
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
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
