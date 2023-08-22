import { useSelector } from "react-redux";

const NotFound = () => {
  const { isLoggedIn: isUserLoggedIn } = useSelector(
    (state) => state.user.isLoggedIn
  );

  console.log(isUserLoggedIn);

  return <h1 className="mb-auto mt-auto self-center">404 Page not found!</h1>;
};
export default NotFound;
