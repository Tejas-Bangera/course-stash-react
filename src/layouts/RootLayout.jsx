import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    // <div className="flex flex-col min-h-screen">
    <div className="flex flex-col min-h-screen items-center">
      <Navbar />
      <Outlet />
    </div>
  );
};
export default RootLayout;
