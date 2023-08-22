import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/user/userSlice";

const CartCourseCard = ({ _id, title, description, imageLink, price }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.user.cart);

  function handleRemove() {
    axios
      .delete(`${import.meta.env.VITE_NODE_URL}/users/cart/${_id}`, {
        headers: {
          Authorization: localStorage.getItem("user-token"),
        },
      })
      .then((response) => {
        const course = cart.find((item) => item._id === _id);
        dispatch(removeFromCart(course));
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="flex gap-2 bg-white shadow-md p-2">
      <img
        src={imageLink}
        className="w-60 h-40 object-cover border"
        alt="Course image"
      />
      <div className="flex flex-col w-full gap-1 justify-center md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-lg">
          <h2>{title}</h2>
          <p>{description}</p>
          <p className="font-bold">${price}</p>
        </div>
        <button className="secondary-button w-max h-max" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};
export default CartCourseCard;
