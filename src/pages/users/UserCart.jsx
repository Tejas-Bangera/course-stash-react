import { useSelector } from "react-redux";
import CartCourseCard from "../../components/CartCourseCard";

const UserCart = () => {
  const { cart, cartQuantity, cartTotal } = useSelector((state) => state.user);

  return (
    <div className="section-padding bg-white w-full mx-auto max-w-6xl">
      <h1 className="leading-loose">Shopping Cart</h1>
      <div className="flex justify-between items-center mb-5">
        <h2 className="leading-loose">Total: ${cartTotal}</h2>
        <button className="primary-button">Checkout</button>
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
