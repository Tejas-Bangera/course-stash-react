const AuthForm = ({ email, password, setEmail, setPassword, handleSubmit }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-5 mt-10 w-full"
    >
      <div className="form-input-group">
        <label htmlFor="email" className="mandatory-input">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="form-input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="form-input-group">
        <label htmlFor="password" className="mandatory-input">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="form-input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <button type="submit" className="primary-button p-2 mt-2">
        Submit
      </button>
    </form>
  );
};
export default AuthForm;
