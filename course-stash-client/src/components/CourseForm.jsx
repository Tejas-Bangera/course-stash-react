import { NavLink } from "react-router-dom";

const CourseForm = ({
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  imageLink,
  setImageLink,
  published,
  setPublished,
  handleSubmit,
  action,
}) => {
  return (
    <section className="bg-white w-full max-w-lg shadow-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-5 section-padding max-w-md mx-auto"
      >
        <h1 className="capitalize">{`${action} Course`}</h1>
        <div className="form-input-group">
          <label htmlFor="title" className="mandatory-input">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            value={title}
            required
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            className="form-input"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="price" className="mandatory-input">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="form-input"
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
            required
          />
        </div>
        <div className="form-input-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            className="form-input"
            value={imageLink}
            onChange={(event) => setImageLink(event.target.value)}
          />
        </div>
        <div className="flex gap-x-3 items-center">
          <input
            type="checkbox"
            id="publish"
            className="accent-pink-500"
            checked={published}
            onChange={(event) => setPublished(event.target.checked)}
          />
          <label htmlFor="publish">Publish</label>
        </div>
        <button type="submit" className="primary-button capitalize">
          {action}
        </button>
        <NavLink to={"/admin/courses"} className="secondary-button text-center">
          Done
        </NavLink>
      </form>
    </section>
  );
};
export default CourseForm;
