import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import CourseForm from "../../components/CourseForm";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const AdminUpdateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState(true);

  const username = useSelector((state) => state.admin.username);
  const { id: courseId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/courses/${courseId}`, {
        headers: {
          Authorization: localStorage.getItem("admin-token"),
        },
      })
      .then((response) => {
        const course = response.data.course;
        setTitle(course.title);
        setDescription(course.description);
        setPrice(course.price);
        setImageLink(course.imageLink);
        setPublished(course.published);
      });
  }, []);
  function updateCourse() {}

  return (
    <div className="section-padding flex flex-col gap-5 w-full max-w-lg mx-auto lg:flex-row lg:max-w-4xl">
      <CourseForm
        title={title}
        description={description}
        price={price}
        imageLink={imageLink}
        published={published}
        handleSubmit={updateCourse}
        action={"update"}
      />
      <div className="shadow-md h-max">
        <CourseCard
          id={courseId}
          title={title}
          description={description}
          price={price}
          imageLink={imageLink}
          published={published}
          author={username}
          role={"admin"}
        />
      </div>
    </div>
  );
};
export default AdminUpdateCourse;
