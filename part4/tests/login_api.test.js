const app = require('../app');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const User = require('../models/user');
const testHelper = require('./test_helper');

const api = supertest(app);

describe('Login tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User(testHelper.rootUser).save();
  });

  test('can login with correct credentials', async () => {
    const login = { username: 'root', password: '12345' };

    const response = await api.post('/api/login').send(login).expect(200).expect('Content-Type', /application\/json/);
    assert.strictEqual(response.body.error, undefined);
    assert.strictEqual(response.body.username, login.username);
    assert.ok(response.body.token);
  });

  test('cannot login with invalid credentials', async () => {
    const wrongPasswordLogin = { username: 'root', password: '99999' };
    let response = await api.post('/api/login').send(wrongPasswordLogin).expect(401).expect('Content-Type', /application\/json/);
    assert.strictEqual(response.body.error, 'invalid username or password');

    const invalidUserLogin  = { username: 'test', password: '12345' };
    response = await api.post('/api/login').send(invalidUserLogin).expect(401).expect('Content-Type', /application\/json/);
    assert.strictEqual(response.body.error, 'invalid username or password');
  });
});

after(async () => await mongoose.connection.close());