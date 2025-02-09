import Togglable from '../components/Togglable';
import NewBlog from '../components/NewBlog';
import { Link } from 'react-router-dom';

const Blogs = ({ blogs, onCreate, blogFormRef }) => {
  const blogStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={onCreate} />
      </Togglable>
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.id} style={blogStyle}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blogs;
