import { useDispatch, useSelector } from "react-redux";
import CartCourseCard from "../../components/CartCourseCard";
import { addCourses, setCart } from "../../store/user/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import ErrorAlert from "../../components/ErrorAlert";
import SuccessAlert from "../../components/SuccessAlert";

const UserCart = () => {
  const { cart, cartQuantity, cartTotal } = useSelector((state) => state.user);
  const [toggleError, setToggleError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong!");
  const [toggleSuccess, setToggleSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Checkout successful!");
  const dispatch = useDispatch();

  const getCartCourses = () => {
    axios
      .get(`${import.meta.env.VITE_NODE_URL}/users/cart`, {
        headers: {
          Authorization: localStorage.getItem("user-token"),
        },
      })
      .then((response) => {
        const { cart } = response.data;
        dispatch(setCart(cart));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCartCourses();
  }, []);

  function handleCheckout() {
    const courseIDs = cart.map((item) => item._id);
    axios
      .post(
        `${import.meta.env.VITE_NODE_URL}/user/courses/all`,
        { courses: courseIDs },
        {
          headers: {
            Authorization: localStorage.getItem("user-token"),
          },
        }
      )
      .then((response) => {
        setToggleError(false);
        setToggleSuccess(true);
        console.log(response);
        dispatch(addCourses(cart));
        dispatch(setCart([]));
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

    console.log("Courses added successfully!");
  }

  return (
    <div className="section-padding bg-white w-full mx-auto max-w-6xl">
      <h1 className="leading-loose">Shopping Cart</h1>
      <div className="flex justify-between items-center mb-5">
        <h2 className="leading-loose">Total: ${cartTotal}</h2>
        {cartQuantity > 0 && (
          <button className="primary-button" onClick={handleCheckout}>
            Checkout
          </button>
        )}
      </div>
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
      <p className="font-bold mt-5">{cartQuantity} Courses in Cart</p>
      <hr />
      <div className="flex flex-col mt-3 gap-5">
        {cart.map((course, index) => (
          <CartCourseCard
            key={course._id}
            _id={course._id}
            title={course.title}
            description={course.description}
            imageLink={course.imageLink}
            price={course.price}
          />
        ))}
      </div>
    </div>
  );
};
export default UserCart;
