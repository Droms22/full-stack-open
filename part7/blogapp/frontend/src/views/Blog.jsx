import React from 'react';

const Blog = ({ blog, onVote }) => {
  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={() => onVote(blog)}>like</button>
      </p>
      <p>Added by {blog.user ? blog.user.name : ''}</p>
    </div>
  );
};

export default Blog;
