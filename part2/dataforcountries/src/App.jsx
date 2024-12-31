import { useEffect, useState } from "react";
import axios from 'axios';
import Countries from "./components/Countries";

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const allCountriesRequest = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
    allCountriesRequest.then(response => {
      setCountries(response.data);
      setFilteredCountries(response.data);
    });
  }, []);

  const handleFilterChange = event => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    const filtered = countries.filter(c => c.name.common.toLowerCase().includes(newFilter.trim().toLowerCase()));
    setFilteredCountries(filtered);
  };

  const handleShowClick = country => setFilteredCountries([country]);

  return (
    <div>
      <div>
        Find countries <input name="filter" value={filter} onChange={handleFilterChange} disabled={countries.length === 0} />
      </div>
      <div>
        {countries.length === 0 ? <p>Loading data...</p> : <Countries countries={filteredCountries} onShowClick={handleShowClick} />}
      </div>
    </div>
  );
};

export default App;