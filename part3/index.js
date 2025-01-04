const express = require('express');
const app = express();
const Person = require('./models/person');

app.use(express.static('dist'));
app.use(express.json());

const cors = require('cors');
app.use(cors());

const morgan = require('morgan');
morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : ' ');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/info', (request, response) => {
  Person.find({}).then(result => {
    response.send(`Phonebook has info for ${result.length} people<br/>${new Date()}`);
  });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const person = new Person(request.body);
  person.save().then(result => {
    response.json(result);
  })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(result => {
      response.json(result);
    })
    .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, _request, response, next) => {
  console.error(error);

  switch (error.name) {
  case 'CastError':
    return response.status(400).send({ error: 'malformatted id' });
  case 'ValidationError':
    return response.status(400).json({ error: error.message });
  default:
    next(error);
  }
};

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});