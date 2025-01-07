import { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("logged-user");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      blogService.setToken(user.token);
      setUser(user);
    }

    fetchBlogs();
  }, []);

  const notify = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: null }), 5000);
  };

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const addNewblog = async (blog) => {
    try {
      const newBlog = await blogService.add(blog);
      setBlogs(blogs.concat(newBlog));
      notify(
        `A new blog "${newBlog.title}" by ${newBlog.author} added!`,
        "success"
      );
    } catch (e) {
      notify(e.response.data.error, "error");
    }
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("logged-user", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setNotification({ message: null, type: null });
    } catch (e) {
      notify(e.response.data.error, "error");
    }

    setUsername("");
    setPassword("");
  };

  const handleLoginFormChange = (event) => {
    if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleLogout = () => {
    setNotification({ message: null, type: null });
    window.localStorage.removeItem("logged-user");
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification notification={notification} />
        <LoginForm
          username={username}
          password={password}
          onChange={handleLoginFormChange}
          onSubmit={handleLoginFormSubmit}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <div>
        {user.name} -
        <button name="logout" type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <BlogForm addNewBlog={addNewblog} />
      <br />
      <BlogList blogs={blogs} />
    </div>
  );
};

export default App;
