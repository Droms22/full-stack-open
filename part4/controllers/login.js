const loginRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });

  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    return response.status(401).json({ error: 'invalid username or password'});
  }

  const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET, { expiresIn: 60*60 });
  response.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;