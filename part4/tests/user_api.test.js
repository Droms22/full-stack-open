const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const User = require('../models/user');
const testHelper = require('./test_helper');

const api = supertest(app);

describe('Users tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User(testHelper.rootUser).save();
  });

  test('Users are returned as json', async () => {
    const response = await api.get('/api/users').expect(200).expect('Content-Type', /application\/json/);
    assert.strictEqual(response.body.length, 1);
  });

  describe('Adding a new user', () => {
    test('a valid user can be added', async () => {
      const newUser = {
        username: 'test',
        name: 'Test',
        password: 'test'
      };

      const request = await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/);
      const { username, name } = request.body;

      assert.strictEqual(username, newUser.username);
      assert.strictEqual(name, newUser.name);

      const users = await testHelper.getUsersIndb();
      assert.strictEqual(users.length, 2);
    });

    test('user with invalid username is not added', async () => {
      const noUsername = { name: 'test', password: 'test' };
      let request = await api.post('/api/users').send(noUsername).expect(400).expect('Content-Type', /application\/json/);
      assert.strictEqual(request.body.error, 'username must be given and must be at least 3 characters long');

      const invalidUsername = { username: 'aa', name: 'test', password: 'test' };
      request = await api.post('/api/users').send(invalidUsername).expect(400).expect('Content-Type', /application\/json/);
      assert.strictEqual(request.body.error, 'username must be given and must be at least 3 characters long');

      const users = await testHelper.getUsersIndb();
      assert.strictEqual(users.length, 1);
    });

    test('user with invalid password is not added', async () => {
      const noPassword = { username: 'test', name: 'test' };
      let request = await api.post('/api/users').send(noPassword).expect(400).expect('Content-Type', /application\/json/);
      assert.strictEqual(request.body.error, 'password must be given and must be at least 3 characters long');

      const invalidPassword = { username: 'test', name: 'test', password: 'aa' };
      request = await api.post('/api/users').send(invalidPassword).expect(400).expect('Content-Type', /application\/json/);
      assert.strictEqual(request.body.error, 'password must be given and must be at least 3 characters long');

      const users = await testHelper.getUsersIndb();
      assert.strictEqual(users.length, 1);
    });

    test('user with a non-unique username is not added', async () => {
      const newUser = {
        username: 'root',
        name: 'Root 2',
        password: 'root'
      };

      const request = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/);
      assert.strictEqual(request.body.error, 'expected "username" to be unique');

      const users = await testHelper.getUsersIndb();
      assert.strictEqual(users.length, 1);
    });
  });
});

after(async () => await mongoose.connection.close());