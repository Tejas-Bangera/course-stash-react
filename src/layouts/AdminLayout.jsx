import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import {
  setUsername as setAdminUsername,
  login as adminLogin,
} from "../store/admin/adminSlice";

const AdminLayout = () => {
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  function checkAdminLogin() {
    axios
      .get(`${import.meta.env.VITE_NODE_URL}/admin/validatejwt`, {
        headers: {
          Authorization: localStorage.getItem("admin-token"),
        },
      })
      .then((response) => {
        setIsLoading(false);
        dispatch(setAdminUsername(response.data.username));
        dispatch(adminLogin());
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    checkAdminLogin();
    console.log(isLoading);
  }, []);

  if (!isLoading) {
    return isAdminLoggedIn ? <Outlet /> : <Navigate to={"login"} />;
  }
};
export default AdminLayout;
