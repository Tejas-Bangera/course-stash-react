import { NavLink } from "react-router-dom";

const EditButton = ({ _id }) => {
  return (
    <NavLink to={`../admin/${_id}/edit`} className="primary-button self-end">
      Edit
    </NavLink>
  );
};
export default EditButton;
