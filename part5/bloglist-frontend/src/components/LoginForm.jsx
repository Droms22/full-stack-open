const LoginForm = ({ username, password, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        Username:
        <input
          name="username"
          type="text"
          value={username}
          onChange={onChange}
        />
      </div>
      <div>
        Password:
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
