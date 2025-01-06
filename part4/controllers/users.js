const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs');
  response.json(users);
});

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!username || username.length < 3) {
    return response.status(400).json({ error: 'username must be given and must be at least 3 characters long'});
  } else if (!password || password.length < 3) {
    return response.status(400).json({ error: 'password must be given and must be at least 3 characters long'});
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({ username, name, passwordHash });
  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = userRouter;