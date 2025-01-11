import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => setCollapsed(!collapsed);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const isCreatedByUser = blog.user.username === user.username;
  const removeBlogButton = (
    <button onClick={() => deleteBlog(blog)}>Remove</button>
  );

  const addLike = (blog) => {
    updateBlog({ ...blog, likes: blog.likes + 1 });
  };

  if (collapsed) {
    return (
      <div style={blogStyle}>
        {blog.title} - {blog.author}
        <button onClick={toggleCollapsed}>View</button>
      </div>
    );
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <button onClick={toggleCollapsed}>Hide</button>
      <div>
        Link:{" "}
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </div>
      <div>
        Likes: {blog.likes} <button onClick={() => addLike(blog)}>like</button>
      </div>
      <div>User: {blog.user.name}</div>
      {isCreatedByUser && removeBlogButton}
    </div>
  );
};

export default Blog;
