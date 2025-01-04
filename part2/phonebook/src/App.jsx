import { useEffect, useState } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: '', number: '' });
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState({ message: null, type: null });

  useEffect(() => {
    personService.getAllPersons().then(res => setPersons(res));
  }, []);

  const filteredPersons = persons.filter(p => p && p.name.toLowerCase().includes(filter.toLowerCase()));

  const notify = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: null }), 5000);
  };

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
    } else if (persons.some(p => p && p.name === newPerson.name)) {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) { 
        const id = persons.find(p => p.name === newPerson.name).id;
        personService
          .updatePerson(id, newPerson)
          .then(res => {
            if (res === null) {
              notify(`Information of ${newPerson.name} has already been removed from server`, 'error');
              setPersons(persons.filter(p => p.name !== newPerson.name));
            } else {
              setPersons(persons.map(note => note.id === id ? res : note));
              notify(`Updated ${newPerson.name} number`, 'success');
            }
          })
          .catch(error => notify(error.response.data.error, 'error'));
      }  
    } else {
      personService
        .createPerson(newPerson)
        .then(res => {
          setPersons(persons.concat(res));
          notify(`Added ${newPerson.name}`, 'success');
        })
        .catch(error => notify(error.response.data.error, 'error'));
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
      <Notification  message={notification.message} type={notification.type} />
      <Filter onFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm newPerson={newPerson} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  );
};

export default App;