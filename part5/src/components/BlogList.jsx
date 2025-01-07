const Blog = ({ blog }) => (
  <div>
    {blog.title} - {blog.author}
  </div>
);

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map((b) => (
        <Blog blog={b} key={b.id} />
      ))}
    </div>
  );
};

export default BlogList;
