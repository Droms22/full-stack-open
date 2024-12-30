import { useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [nextId, setNextId] = useState(5);
  const [filter, setFilter] = useState('');

  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleFormChange = (event) => {
    setNewPerson({
      ...newPerson,
      [event.target.name]: event.target.value
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    //form validation
    if (newPerson.name.trim() === '' || newPerson.number.trim() === '') {
      alert('Please enter both name and number');
    } else if (persons.some(p => p.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
    } else if (persons.some(p => p.number === newPerson.number)) {
      alert(`${newPerson.number} is already added to phonebook`);
    } else {
      //add new person
      setPersons(persons.concat({
        name: newPerson.name,
        number: newPerson.number,
        id: nextId
      }));

      setNextId(nextId + 1);
    }

    //reset form
    setNewPerson({ name: '', number: '' });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm newPerson={newPerson} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;