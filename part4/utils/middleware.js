const logger = require('./logger');
const morgan = require('morgan');

morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : ' ');
const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body');

const unknownEndpoint = (_request, response) => response.status(404).send({ error: 'unknown endpoint' });

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message);

  switch (error.name) {
  case 'CaseError':
    return response.status(400).json({ error: 'malformatted id' });
  case 'ValidationError':
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = { morganLogger, unknownEndpoint, errorHandler };