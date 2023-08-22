import { NavLink, Outlet } from "react-router-dom";
import CourseCard from "../../components/CourseCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { setCourses } from "../../store/admin/adminSlice";
import { useSelector, useDispatch } from "react-redux";

const AdminCourses = () => {
  const { username, courses } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_NODE_URL}/admin/courses`, {
        headers: {
          username,
          Authorization: localStorage.getItem("admin-token"),
        },
      })
      .then((response) => {
        const { courses: respCourses } = response.data;
        dispatch(setCourses(respCourses));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="w-full max-w-6xl flex flex-col items-center p-10 mx-auto gap-y-10">
      {/* Create a course section */}
      <section className="w-full bg-white section-padding flex flex-col items-center gap-y-10 md:flex-row md:justify-around shadow-md">
        <p className="font-bold">Jump Into Course Creation</p>
        <NavLink to={"create"} className="primary-button px-12 py-3">
          Create Your Course
        </NavLink>
      </section>
      <Outlet />
      <section className="bg-white w-full shadow-md">
        <div className="max-w-6xl section-padding mx-auto">
          <header>
            <h1 className="leading-loose">Courses</h1>
          </header>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                _id={course._id}
                title={course.title}
                description={course.description}
                price={course.price}
                author={course.author}
                imageLink={course.imageLink}
                published={course.published}
                role={"admin"}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
export default AdminCourses;
