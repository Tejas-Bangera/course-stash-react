import { NavLink } from "react-router-dom";

const EditButton = ({ path }) => {
  return (
    <NavLink to={path} className="primary-button self-end">
      Edit
    </NavLink>
  );
};
export default EditButton;
