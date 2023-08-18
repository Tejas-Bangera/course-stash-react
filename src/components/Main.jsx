import CourseCard from "./CourseCard";
import { NavLink } from "react-router-dom";

const Main = () => {
  return (
    // <main className="flex flex-col items-center w-full max-w-6xl border border-red-600">
    <main className="flex flex-col items-center">
      {/* Brand section */}
      <section className="flex justify-center p-10 max-w-6xl">
        <div className="bg-white section-padding flex flex-col gap-7 md:flex-row justify-center md:items-center my-gradient">
          <div>
            <h1>Course&nbsp;</h1>
            <h1>Stash</h1>
          </div>
          <p className="text-md  lg:text-xl">
            Elevating education beyond boundaries: Connecting learners with a
            world of knowledge and possibilities through expertly crafted
            courses.
          </p>
        </div>
      </section>
      {/* Explore courses section */}
      <section className="bg-white w-full">
        <div className="max-w-6xl section-padding mx-auto">
          <header>
            <h1 className="leading-loose">A broad selection of courses</h1>
          </header>
          <p className="text-md lg:text-xl">
            Choose multiple online courses with new additions published every
            month.
          </p>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5">
            <CourseCard id={1} role={"user"} />
            <CourseCard id={1} role={"user"} />
            <CourseCard id={1} role={"user"} />
            <CourseCard id={1} role={"user"} />
            <CourseCard id={1} role={"user"} />
            <CourseCard id={1} role={"user"} />
          </div>
        </div>
      </section>
      {/* Top categories section */}
      <section className="w-full">
        <div className="section-padding max-w-6xl mx-auto">
          <header className="mb-6">
            <h1>Top Categories</h1>
          </header>
          <div>
            <ul className="flex gap-x-5 gap-y-3 flex-wrap">
              <li className="category-item">Design</li>
              <li className="category-item">Development</li>
              <li className="category-item">Marketing</li>
              <li className="category-item">IT and Software</li>
              <li className="category-item">Personal Development</li>
              <li className="category-item">Business</li>
              <li className="category-item">Photography</li>
              <li className="category-item">Music</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Become an instructor section */}
      <section className="bg-white w-full">
        <div className="section-padding mx-auto flex flex-col gap-y-4 justify-center items-center lg:flex-row lg:gap-x-10 max-w-6xl">
          <div>
            <img
              src="https://source.unsplash.com/5QgIuuBxKwM"
              className="object-cover w-[500px] lg:max-w-md"
              alt=""
            />
          </div>
          <div className="text-center lg:text-left lg:items-start flex flex-col gap-y-5 items-center">
            <h1>Become an instructor</h1>
            <p className="text-md lg:text-lg max-w-[500px]">
              Instructors from around the world teach hundreds of students on
              Course Stash. We provide the tools and skills to teach what you
              love.
            </p>
            <NavLink
              to={"admin/signup"}
              className="primary-button font-bold w-full p-3 lg:w-fit"
            >
              Start teaching today
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Main;
