import { useState } from 'react';

const Blog = ({ blog, onVote, onComment }) => {
  const [comment, setComment] = useState('');

  if (!blog) {
    return <div>Loading...</div>;
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    onComment(blog, comment);
    setComment('');
  };

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
      <h3>comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
