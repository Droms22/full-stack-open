const Filter = ({ onFilterChange }) => {
  return (
    <div>
        filter shown with <input name='filter' onChange={onFilterChange}></input>
    </div>
  );
};

export default Filter;