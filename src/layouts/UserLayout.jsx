import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setUsername, login as userLogin } from "../store/user/userSlice";
import axios from "axios";

const UserLayout = () => {
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  function checkUserLogin() {
    axios
      .get(`${import.meta.env.VITE_NODE_URL}/user/validatejwt`, {
        headers: {
          Authorization: localStorage.getItem("user-token"),
        },
      })
      .then((response) => {
        setIsLoading(false);
        dispatch(setUsername(response.data.username));
        dispatch(userLogin());
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    checkUserLogin();
    console.log(isLoading);
  }, []);

  if (!isLoading) {
    return isUserLoggedIn ? <Outlet /> : <Navigate to={"login"} />;
  }
};
export default UserLayout;
