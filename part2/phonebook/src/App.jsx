import { useEffect, useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAllPersons().then(res => setPersons(res));
  }, []);

  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()));

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handleFormChange = event => {
    setNewPerson({
      ...newPerson,
      [event.target.name]: event.target.value
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    
    if (newPerson.name.trim() === '') {
      alert('Please enter a name');
    } else if (persons.some(p => p.name === newPerson.name)) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) { 
        const id = persons.find(p => p.name === newPerson.name).id;
        personService
          .updatePerson(id, newPerson)
          .then(res => setPersons(persons.map(note => note.id === id ? res : note)));
      }
      setNewPerson({ name: '', number: '' });      
    } else {
      personService
        .createPerson(newPerson)
        .then(res => setPersons(persons.concat(res)));
    }

    setNewPerson({ name: '', number: '' });
  };

  const handleDelete = person => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deletePerson(person.id);
      setPersons(persons.filter(p => p.id !== person.id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm newPerson={newPerson} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;