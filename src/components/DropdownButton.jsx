import { useState } from "react";
import { NavLink } from "react-router-dom";

const DropdownButton = ({
  isAdminLoggedIn,
  isUserLoggedIn,
  adminUsername,
  cartQuantity,
  handleLogout,
  username,
}) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="relative" onClick={() => setToggle(!toggle)}>
      <button className=" mt-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      {toggle && (
        <div className="absolute bg-white right-0 top-10 shadow-md">
          <nav>
            <ul className="flex flex-col items-center">
              {isAdminLoggedIn ? (
                <>
                  <li className="text-sm nav-item">{adminUsername}</li>
                  <button className="w-full" onClick={handleLogout}>
                    <li className="nav-item">Logout</li>
                  </button>
                </>
              ) : isUserLoggedIn ? (
                <>
                  <li className="text-sm nav-item">{username}</li>
                  <NavLink to={"user/courses"} className="w-full">
                    <li className="nav-item">My Courses</li>
                  </NavLink>
                  <NavLink to={"user/cart"} className="w-full">
                    <li className="nav-item flex items-center justify-center">
                      <span className="mr-3">Cart</span>
                      {cartQuantity > 0 && (
                        <span className="text-xs text-white bg-slate-800 px-1 rounded-full">
                          {cartQuantity}
                        </span>
                      )}
                    </li>
                  </NavLink>
                  <li className="w-full nav-item">
                    <button className="w-full" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <NavLink to={"admin/login"} className="w-full">
                    <li className="nav-item underline">Instructor?</li>
                  </NavLink>
                  <NavLink to="users/login" className="w-full">
                    <li className="nav-item">Login</li>
                  </NavLink>
                  <NavLink to={"users/signup"} className="w-full">
                    <li className="nav-item">Signup</li>
                  </NavLink>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};
export default DropdownButton;
