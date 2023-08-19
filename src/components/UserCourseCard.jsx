const UserCourseCard = ({
  id,
  title,
  description,
  imageLink,
  author,
  price,
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
            <p className="text-xs lg:text-sm text-gray-600">By {author}</p>
            <p className="font-bold">${price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCourseCard;
