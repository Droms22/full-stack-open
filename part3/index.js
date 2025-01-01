const express = require('express');
const app = express();

app.use(express.static('dist'));
app.use(express.json());

const cors = require('cors');
app.use(cors());

const morgan = require('morgan');
morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : ' ');
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/info', (request, response) => {
    response.send(`Phonebook has info for ${persons.length} people<br/>${new Date()}`);
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(p => p.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(p => p.id !== id);

    response.status(204).end();
});

app.post('/api/persons', (request, response) => {
    const person = request.body;

    if (!person.name || !person.number) {
        return response.status(400).json({ error: 'name or number is missing'});
    } else if (persons.some(p => p.name === person.name)) {
        return response.status(400).json({ error: 'name must be unique' });
    }

    person.id = String(Math.floor(Math.random() * 100000));
    persons = persons.concat(person);

    response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});