const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const Blog = require('../models/blog');
const testHelper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  
  const promises = testHelper.initialBlogs.map(blog => new Blog(blog).save());
  await Promise.all(promises);
});

test('Blogs are returned as json', async () => {
  const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
  assert.strictEqual(response.body.length, testHelper.initialBlogs.length);
});

test('Blog unique identifier property is named "id"', async () => {
  const response = await api.get('/api/blogs');
  const blog = response.body[0];
  assert.ok(blog.id);
});

test('A valid blog can be added', async () => {
  const newBlog = {
    title: 'test',
    author: 'test',
    url: 'test',
    likes: 0
  };

  const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);
  const blog = new Blog(response.body).toJSON();
  delete blog.id;
  assert.deepStrictEqual(blog, newBlog);

  const blogsInDb = await testHelper.getBlogsInDb();
  assert.strictEqual(blogsInDb.length, testHelper.initialBlogs.length + 1);
});

test('If the "likes" property is missing, it will default to 0', async () => {
  const newBlog = {
    title: 'test',
    author: 'test',
    url: 'test'
  };

  const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/);
  assert.strictEqual(response.body.likes, 0);
});

test('if the "title" property is missing, the new blog will not be added', async () => {
  const newBlog = {
    author: 'test',
    url: 'test',
    likes: 0
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsInDb = await testHelper.getBlogsInDb();
  assert.strictEqual(blogsInDb.length, testHelper.initialBlogs.length);
});

test('if the "url" property is missing, the new blog will not be added', async () => {
  const newBlog = {
    title: 'test',
    author: 'test',
    likes: 0
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsInDb = await testHelper.getBlogsInDb();
  assert.strictEqual(blogsInDb.length, testHelper.initialBlogs.length);
});

after(async () => await mongoose.connection.close());