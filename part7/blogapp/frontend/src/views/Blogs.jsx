import Togglable from '../components/Togglable';
import NewBlog from '../components/NewBlog';
import { Link } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Blogs = ({ blogs, onCreate, blogFormRef }) => {
  console.log(blogs);
  return (
    <div>
      <div className="text-center mb-2 mt-2">
        <h2 className="text-2xl">Blogs</h2>
      </div>
      <Table>
        <TableCaption>A list of recent blogs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="text-right">Url</TableHead>
            <TableHead className="text-right">Likes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <TableRow key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                </Link>
                <TableCell>{blog.author}</TableCell>
                <TableCell className="text-right">
                  <a href={blog.url} target="_blank">
                    {blog.url}
                  </a>
                </TableCell>
                <TableCell className="text-right">{blog.likes}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <NewBlog doCreate={onCreate} />
      </Togglable>
    </div>
  );
};

export default Blogs;
