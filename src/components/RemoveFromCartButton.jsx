const RemoveFromCartButton = ({ removeCourse }) => {
  return (
    <button className="secondary-button self-end" onClick={removeCourse}>
      Remove
    </button>
  );
};
export default RemoveFromCartButton;
