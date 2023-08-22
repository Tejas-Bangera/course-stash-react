import { NavLink } from "react-router-dom";
import CartIcon from "./CartIcon";

const NavMenuItems = ({
  isAdminLoggedIn,
  isUserLoggedIn,
  adminUsername,
  cartQuantity,
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
              <NavLink to={"user/cart"} className="">
                <CartIcon cartQuantity={cartQuantity} />
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
