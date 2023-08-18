import { useDispatch } from "react-redux";
import { addToCart } from "../store/user/userSlice";
import axios from "axios";

const AddToCartButton = ({ course }) => {
  const dispatch = useDispatch();

  function handleAddToCart() {
    axios
      .post(`http://localhost:3000/users/cart/${course._id}`, null, {
        headers: {
          Authorization: localStorage.getItem("user-token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(addToCart(course));
      })
      .catch((error) => console.log(error));
  }

  return (
    <button className="primary-button self-end" onClick={handleAddToCart}>
      Add
    </button>
  );
};
export default AddToCartButton;
