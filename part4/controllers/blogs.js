const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post(
  '/',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    if (!request.body.title || !request.body.url) {
      return response.status(400).end();
    }

    if (!request.body.likes) {
      request.body.likes = 0;
    }

    const user = request.user;

    request.body.user = user._id;
    const blog = new Blog(request.body);
    const saved = await blog.save();

    user.blogs = user.blogs.concat(saved._id);
    await user.save();

    response.status(201).json(saved);
  }
);

blogsRouter.delete(
  '/:id',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (request.user.id.toString() !== blog.user.toString()) {
      return response.status(401).json({ error: 'invalid user' });
    }

    await blog.deleteOne();
    response.status(204).end();
  }
);

blogsRouter.put(
  '/:id',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    /* const blog = await Blog.findById(request.params.id);
    if (request.user.id.toString() !== blog.user.toString()) {
      return response.status(401).json({ error: 'invalid user' });
    } */

    const { title, author, url, likes } = request.body;
    const updated = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { new: true, runValidators: true, context: 'query' }
    ).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(updated);
  }
);

module.exports = blogsRouter;
