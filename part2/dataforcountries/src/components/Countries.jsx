import CountryData from "./CountryData";

const Country = ({ country, onShowClick }) => {
  return (
    <tr>
      <td>{country.name.common}</td>
      <td><button onClick={() => onShowClick(country)}>show</button></td>
    </tr>
  );
};

const Countries = ({ countries, onShowClick }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }
  
  if (countries.length === 0) {
    return <p>No matches.</p>;
  }

  if (countries.length === 1) {
    return <CountryData country={countries[0]} />;
  }
  
  return (
    <table>
      {countries.map(c => <Country key={c.name.common} country={c} onShowClick={onShowClick} />)}
    </table>
  );
};

export default Countries;