import { NavLink } from "react-router-dom";

const NavMenuItems = ({
  isAdminLoggedIn,
  isUserLoggedIn,
  adminUsername,
  handleLogout,
  username,
}) => {
  return (
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
  );
};
export default NavMenuItems;
