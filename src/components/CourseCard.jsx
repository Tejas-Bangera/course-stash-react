import { NavLink } from "react-router-dom";

const CourseCard = ({
  title,
  description,
  price,
  author,
  imageLink,
  published,
  id,
  role,
}) => {
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
            <p className="text-xs lg:text-sm text-gray-600">{author}</p>
            <p className="text-xs lg:text-sm text-gray-600">
              Published: {published ? "Yes" : "No"}
            </p>
            <p className="font-bold">${price}</p>
          </div>
          {role === "admin" && (
            <NavLink
              to={`../admin/${id}/edit`}
              className="primary-button self-end"
            >
              Edit
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};
export default CourseCard;
