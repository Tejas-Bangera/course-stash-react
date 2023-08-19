import axios from "axios";
import CourseForm from "../../components/CourseForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../../store/admin/adminSlice";

const AdminCreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState(true);

  const username = useSelector((state) => state.admin.username);
  const dispatch = useDispatch();

  function createCourse(event) {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3000/admin/courses",
        {
          title,
          description,
          price,
          imageLink,
          author: username,
          published,
        },
        {
          headers: {
            Authorization: localStorage.getItem("admin-token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(setCourses(response.data.courses));
        setTitle("");
        setDescription("");
        setPrice(0);
        setImageLink("");
        setPublished(true);
      })
      .catch((error) => console.log(error));
  }

  return (
    <CourseForm
      {...{
        title,
        setTitle,
        description,
        setDescription,
        price,
        setPrice,
        imageLink,
        setImageLink,
        published,
        setPublished,
      }}
      handleSubmit={createCourse}
      action={"create"}
    />
  );
};
export default AdminCreateCourse;
