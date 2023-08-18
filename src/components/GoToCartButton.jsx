import { NavLink } from "react-router-dom";

const GoToCartButton = () => {
  return (
    <NavLink to={`user/cart`} className="primary-button self-end">
      Go to cart
    </NavLink>
  );
};
export default GoToCartButton;
