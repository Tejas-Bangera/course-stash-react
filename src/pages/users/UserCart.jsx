import { useSelector } from "react-redux";

const UserCart = () => {
  const { cart, cartQuantity, cartTotal } = useSelector((state) => state.user);

  return (
    <div className="section-padding bg-white">
      <h1 className="leading-loose">Shopping Cart</h1>
      <h2 className="leading-loose">Total: {cartTotal}</h2>
      <div className="flex flex-col">
        <div>{cart.map((course) => course.title)}</div>
      </div>
    </div>
  );
};
export default UserCart;
