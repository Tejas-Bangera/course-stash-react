import { useDispatch, useSelector } from "react-redux";
import Brand from "./Brand";
import { NavLink, useNavigate } from "react-router-dom";
import { logout as adminLogout } from "../store/admin/adminSlice";
import { logout as userLogout } from "../store/user/userSlice";
import DropdownButton from "./DropdownButton";
import NavMenuItems from "./NavMenuItems";

const Navbar = () => {
  const { username: adminUsername, isLoggedIn: isAdminLoggedIn } = useSelector(
    (state) => state.admin
  );
  const {
    username,
    isLoggedIn: isUserLoggedIn,
    cartQuantity,
  } = useSelector((state) => state.user);

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
    <header className="bg-white w-full shadow-md p-4 z-10">
      <div className="flex items-center justify-between w-full max-w-screen-2xl mx-auto">
        <Brand />
        <div className="md:hidden">
          <DropdownButton
            isAdminLoggedIn={isAdminLoggedIn}
            adminUsername={adminUsername}
            isUserLoggedIn={isUserLoggedIn}
            username={username}
            cartQuantity={cartQuantity}
            handleLogout={handleLogout}
          />
        </div>
        <div className="hidden md:block">
          <NavMenuItems
            isAdminLoggedIn={isAdminLoggedIn}
            adminUsername={adminUsername}
            isUserLoggedIn={isUserLoggedIn}
            username={username}
            cartQuantity={cartQuantity}
            handleLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
};
export default Navbar;
