const logger = require('./logger');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : ' ');
const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body');

const unknownEndpoint = (_request, response) => response.status(404).send({ error: 'unknown endpoint' });

const errorHandler = (error, _request, response, next) => {
  logger.error(`${error.name} - ${error.message}`);

  switch (error.name) {
  case 'CaseError':
    return response.status(400).json({ error: 'malformatted id' });
  case 'ValidationError':
    return response.status(400).json({ error: error.message });
  case 'MongoServerError':
    if (error.message.includes('E11000 duplicate key error collection')) {
      return response.status(400).json({ error: 'expected "username" to be unique' });
    } else {
      return response.status(400).json({ error: error.message });
    }
  case 'JsonWebTokenError':
    return response.status(401).json({ error: 'invalid token' });
  case 'TokenExpiredError':
    return response.status(401).json({ error: 'token expired' });
  }

  next(error);
};

const tokenExtractor = (request, _response, next) => {
  const auth = request.get('authorization');
  if (auth && auth.startsWith('Bearer ')) {
    request.token = auth.replace('Bearer ', '');
  }
  
  next();
};

const userExtractor = async (request, response, next) => {
  const token = jwt.verify(request.token, process.env.SECRET);
  if (!token.id) {
    return response.status(401).json({ error: 'invalid token' });
  } 

  const user = await User.findById(token.id);

  if (!user) {
    return response.status(401).json({ error: 'invalid user' });
  }

  request.user = user;

  next();
};

module.exports = { morganLogger, unknownEndpoint, errorHandler, tokenExtractor, userExtractor };