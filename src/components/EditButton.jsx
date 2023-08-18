import { NavLink } from "react-router-dom";

const EditButton = ({ id }) => {
  return (
    <NavLink to={`../admin/${id}/edit`} className="primary-button self-end">
      Edit
    </NavLink>
  );
};
export default EditButton;
