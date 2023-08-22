import axios from "axios";
import CourseForm from "../../components/CourseForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../../store/admin/adminSlice";
import ErrorAlert from "../../components/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert";

const AdminCreateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState(true);
  const [toggleError, setToggleError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong!");
  const [toggleSuccess, setToggleSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Course created successful!"
  );

  const username = useSelector((state) => state.admin.username);
  const dispatch = useDispatch();

  function createCourse(event) {
    event.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_NODE_URL}/admin/courses`,
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
        setToggleError(false);
        setToggleSuccess(true);
        dispatch(setCourses(response.data.courses));
        setTitle("");
        setDescription("");
        setPrice(0);
        setImageLink("");
        setPublished(true);
      })
      .catch((error) => {
        console.log(error);
        setToggleSuccess(false);
        setToggleError(true);
        if (error.code === "ERR_NETWORK") {
          setErrorMessage("Something went wrong!");
        } else if (error.code === "ERR_BAD_REQUEST") {
          setErrorMessage("Invalid session!");
        }
      });
  }

  return (
    <>
      {toggleError ? (
        <ErrorAlert
          message={errorMessage}
          toggle={() => setToggleError((prev) => !prev)}
        />
      ) : (
        toggleSuccess && (
          <SuccessAlert
            message={successMessage}
            toggle={() => setToggleSuccess((prev) => !prev)}
          />
        )
      )}
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
    </>
  );
};
export default AdminCreateCourse;
