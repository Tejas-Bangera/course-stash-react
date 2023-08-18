import { NavLink } from "react-router-dom";

const GoToCartButton = () => {
  return (
    <NavLink to={`user/cart`} className="primary-button self-end">
      Cart
    </NavLink>
  );
};
export default GoToCartButton;
