import { useDispatch, useSelector } from "react-redux";
import CartCourseCard from "../../components/CartCourseCard";
import { addCourses, setCart } from "../../store/user/userSlice";
import axios from "axios";

const UserCart = () => {
  const { cart, cartQuantity, cartTotal } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function handleCheckout() {
    const courseIDs = cart.map((item) => item._id);
    axios
      .post(
        "http://localhost:3000/user/courses/all",
        { courses: courseIDs },
        {
          headers: {
            Authorization: localStorage.getItem("user-token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(addCourses(cart));
        dispatch(setCart([]));
      })
      .catch((error) => console.log(error));

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
      <p className="font-bold">{cartQuantity} Courses in Cart</p>
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
