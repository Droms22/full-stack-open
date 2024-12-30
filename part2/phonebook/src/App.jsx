import { useEffect, useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);

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
      const maxId = Math.max(...persons.map(item => item.id));

      setPersons(persons.concat({
        name: newPerson.name,
        number: newPerson.number,
        id: maxId + 1
      }));
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