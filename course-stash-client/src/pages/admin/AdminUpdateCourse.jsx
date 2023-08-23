import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import CourseForm from "../../components/CourseForm";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import ErrorAlert from "../../components/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert";

const AdminUpdateCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState(true);
  const [toggleError, setToggleError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong!");
  const [toggleSuccess, setToggleSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(
    "Course updated successful!"
  );

  const username = useSelector((state) => state.admin.username);
  const { id: courseId } = useParams();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_NODE_URL}/admin/courses/${courseId}`, {
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
  }, []);
  function updateCourse(event) {
    event.preventDefault();

    axios
      .put(
        `${import.meta.env.VITE_NODE_URL}/admin/courses/${courseId}`,
        {
          title,
          description,
          price,
          author: username,
          imageLink,
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
      <div className="section-padding flex flex-col gap-5 w-full max-w-lg mx-auto lg:flex-row lg:max-w-4xl">
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
            role={"admin-editing"}
          />
        </div>
      </div>
    </>
  );
};
export default AdminUpdateCourse;
