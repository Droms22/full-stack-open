const PersonForm = ({ newPerson, onFormSubmit, onFormChange }) => {
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
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;