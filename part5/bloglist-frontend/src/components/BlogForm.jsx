import { useState } from "react";

const BlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const blog = { title, author, url };
    addNewBlog(blog);

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            name="title"
            type="text"
            value={title}
            className="input-blog-title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            name="author"
            type="text"
            value={author}
            className="input-blog-author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:
          <input
            name="url"
            type="text"
            value={url}
            className="input-blog-url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit" name="create" className="btn-create-blog">
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
