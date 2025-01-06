const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const Blog = require('../models/blog');
const User = require('../models/user');
const testHelper = require('./test_helper');

const api = supertest(app);

const getRootUserToken = async () => {
  const response = await api.post('/api/login').send({ username: 'root', password: '12345' }).expect(200).expect('Content-Type', /application\/json/);
  return response.body.token;
};

describe('Blogs tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User(testHelper.rootUser).save();

    await Blog.deleteMany({});
    
    const promises = testHelper.initialBlogs.map(blog => new Blog(blog).save());
    await Promise.all(promises);
  });
  
  test('Blogs are returned as json', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
    assert.strictEqual(response.body.length, testHelper.initialBlogs.length);
  });
  
  test('Blog unique identifier is named "id"', async () => {
    const response = await api.get('/api/blogs');
    const blog = response.body[0];
    assert.ok(blog.id);
  });
  
  describe('Adding a new blog', () => {
    test('Can add a valid blog if logged', async () => {
      const newBlog = {
        title: 'test',
        author: 'test',
        url: 'test',
        likes: 0
      };
    
      const token = await getRootUserToken();
      const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`).expect(201).expect('Content-Type', /application\/json/);
      const blog = new Blog(response.body).toJSON();
      delete blog.id;
      delete blog.user;
      assert.deepStrictEqual(blog, newBlog);
    
      const blogsInDb = await testHelper.getBlogsInDb();
      assert.strictEqual(blogsInDb.length, testHelper.initialBlogs.length + 1);
    });
    
    test('Can\'t add a valid blog if not logged', async () => {
      const newBlog = {
        title: 'test',
        author: 'test',
        url: 'test',
        likes: 0
      };

      const response = await api.post('/api/blogs').send(newBlog).expect(401);
      assert.strictEqual(response.body.error, 'invalid token');
    });

    test('"likes" property is missing, it will default to 0', async () => {
      const newBlog = {
        title: 'test',
        author: 'test',
        url: 'test'
      };
    
      const token = await getRootUserToken();
      const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`).expect(201).expect('Content-Type', /application\/json/);
      assert.strictEqual(response.body.likes, 0);
    });
    
    test('"title" property is missing, new blog will not be added', async () => {
      const newBlog = {
        author: 'test',
        url: 'test',
        likes: 0
      };
    
      const token = await getRootUserToken();
      await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`).expect(400);
    
      const blogsInDb = await testHelper.getBlogsInDb();
      assert.strictEqual(blogsInDb.length, testHelper.initialBlogs.length);
    });
    
    test('"url" property is missing, new blog will not be added', async () => {
      const newBlog = {
        title: 'test',
        author: 'test',
        likes: 0
      };
    
      const token = await getRootUserToken();
      await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`).expect(400);
    
      const blogsInDb = await testHelper.getBlogsInDb();
      assert.strictEqual(blogsInDb.length, testHelper.initialBlogs.length);
    });
  });

  describe('Deleting a blog', () => {
    test('a blog can be deleted', async () => {
      let blogs = await testHelper.getBlogsInDb();
      const blogToDelete = blogs[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      blogs = await testHelper.getBlogsInDb();
      assert.strictEqual(blogs.length, testHelper.initialBlogs.length - 1);
    });
  });

  describe('Updating a blog', () => {
    test('a blog can be updated', async () => {
      let blogs = await testHelper.getBlogsInDb();
      const blogToUpdate = { ...blogs[0] };
      blogToUpdate.likes = 999;

      await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200);

      let updated = await Blog.findById(blogToUpdate.id);
      updated = updated.toJSON();
      assert.deepStrictEqual(updated, blogToUpdate);
    });
  });
});

after(async () => await mongoose.connection.close());