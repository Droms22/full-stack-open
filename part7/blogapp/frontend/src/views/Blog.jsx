import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
      <div className="text-center mb-2 mt-2">
        <h2 className="text-2xl">
          {blog.title} by {blog.author}
        </h2>
      </div>
      <div className="text-lg grid gap-4">
        <p>
          URL:
          <a href={blog.url} target="_blank" className="font-medium">
            {blog.url}
          </a>
        </p>
        <p>
          {blog.likes} Likes{' '}
          <Button
            className="ml-2"
            variant="outline"
            onClick={() => onVote(blog)}
          >
            Like
          </Button>
        </p>
        <p>
          Added by{' '}
          <span className="font-medium">{blog.user ? blog.user.name : ''}</span>
        </p>
        <h2>Comments:</h2>
        <ul>
          {blog.comments.map((comment) => (
            <li>{comment}</li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit}>
          <div className="grid w-full gap-2">
            <Textarea
              placeholder="Type your message here."
              type="text"
              name="comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <Button type="submit" variant="outline">
              Add Comment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Blog;
