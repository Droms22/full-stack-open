const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');

mongoose.set('strictQuery', false);
logger.info(`Connecting to: ${config.MONGODB_URI}`);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to MongoDb'))
  .catch(error => logger.error(`Error connecting to MongoDb: ${error}`));

app.use(middleware.morganLogger);
app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
