import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import UserLogin from "./pages/users/UserLogin";
import UserSignUp from "./pages/users/UserSignUp";
import UserCart from "./pages/users/UserCart";
import RootLayout from "./layouts/RootLayout";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminSignUp from "./pages/admin/AdminSignUp";
import Landing from "./pages/Landing";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminUpdateCourse from "./pages/admin/AdminUpdateCourse";
import AdminCreateCourse from "./pages/admin/AdminCreateCourse";
import UserCourses from "./pages/users/UserCourses";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Landing />} />
      <Route path="users/login" element={<UserLogin />} />
      <Route path="users/signup" element={<UserSignUp />} />
      <Route path="user/cart" element={<UserCart />} />
      <Route path="user/courses" element={<UserCourses />} />
      <Route path="admin/login" element={<AdminLogin />} />
      <Route path="admin/signup" element={<AdminSignUp />} />
      <Route path="admin/courses" element={<AdminCourses />}>
        <Route path="create" element={<AdminCreateCourse />} />
      </Route>
      <Route path="admin/:id/edit" element={<AdminUpdateCourse />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
