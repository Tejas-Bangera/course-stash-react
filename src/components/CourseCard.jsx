import { useSelector } from "react-redux";
import EditButton from "./EditButton";
import AddToCartButton from "./AddToCartButton";
import GoToCartButton from "./GoToCartButton";
import { useEffect, useState } from "react";

const CourseCard = ({
  title,
  description,
  price,
  author,
  imageLink,
  published,
  _id,
}) => {
  const { isLoggedIn: isAdminLoggedIn } = useSelector(
    (state) => state.admin.isLoggedIn
  );
  const { isLoggedIn: isUserLoggedIn, cart } = useSelector(
    (state) => state.user
  );

  const course = {
    _id,
    title,
    description,
    price,
    author,
    imageLink,
  };

  return (
    <div className="bg-white flex flex-col gap-y-2 h-max">
      <img
        src={imageLink}
        className="h-60 object-cover border"
        alt={`Course ${title} image`}
      />
      <div className="p-1">
        <p className="font-bold leading-5">{title}</p>
        <p>{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <p className="text-xs lg:text-sm text-gray-600">By {author}</p>
            {isAdminLoggedIn && (
              <p className="text-xs lg:text-sm text-gray-600">
                Published: {published ? "Yes" : "No"}
              </p>
            )}
            <p className="font-bold">${price}</p>
          </div>
          {isAdminLoggedIn ? (
            <EditButton id={id} />
          ) : (
            isUserLoggedIn &&
            (cart.find((item) => item._id === _id) ? (
              <GoToCartButton />
            ) : (
              <AddToCartButton course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default CourseCard;
