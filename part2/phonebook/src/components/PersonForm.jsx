const PersonForm = ({ newPerson, onFormSubmit, onFormChange }) => {
  const canSubmit = newPerson.name.trim() !== '' && newPerson.number.trim() !== '';
  
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div>
          name: <input name='name' value={newPerson.name} onChange={onFormChange}/>
        </div>
        <div>
          number: <input name='number' value={newPerson.number} onChange={onFormChange}/>
        </div>
        <div>
          <button type="submit" disabled={!canSubmit} >add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;