import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";

const App = () => {
  const blogFormRef = useRef();

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
    const fetchedBlogs = await blogService.getAll();
    fetchedBlogs.sort((a, b) => b.likes - a.likes);
    setBlogs(fetchedBlogs);
  };

  const addNewblog = async (blog) => {
    blogFormRef.current.toggleVisibility();
    try {
      const newBlog = await blogService.add(blog);
      const newBlogs = blogs.concat(newBlog);
      newBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogs);
      notify(
        `A new blog "${newBlog.title}" by ${newBlog.author} added!`,
        "success"
      );
    } catch (e) {
      notify(e.response.data.error, "error");
    }
  };

  const updateBlog = async (blog) => {
    try {
      const updated = await blogService.update(blog);
      const newBlogs = blogs.map((blog) =>
        blog.id === updated.id ? updated : blog
      );
      newBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogs);
    } catch (e) {
      notify(e.response.data.error, "error");
    }
  };

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
        await blogService.deleteBlog(blog);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      }
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
      <br />
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm addNewBlog={addNewblog} />
      </Togglable>
      <br />
      {blogs.map((b) => (
        <Blog
          blog={b}
          key={b.id}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
