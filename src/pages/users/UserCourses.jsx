import { useSelector } from "react-redux";
import UserCourseCard from "../../components/UserCourseCard";

const UserCourses = () => {
  const courses = useSelector((state) => state.user.courses);

  return (
    <main className="w-full max-w-6xl flex flex-col items-center p-10 mx-auto gap-y-10">
      <section className="bg-white w-full shadow-md">
        <div className="max-w-6xl section-padding mx-auto">
          <header>
            <h1 className="leading-loose">Your Courses</h1>
          </header>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5">
            {courses.map((course, index) => (
              <UserCourseCard
                key={index}
                id={course._id}
                title={course.title}
                description={course.description}
                price={course.price}
                author={course.author}
                imageLink={course.imageLink}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
export default UserCourses;
