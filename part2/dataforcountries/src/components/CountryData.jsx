import WeatherData from "./WeatherData";

const CountryData = ({ country }) => {  
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <p><b>Languages:</b></p>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang} >{lang}</li>)}
      </ul>
      <p><b>Flag:</b></p>
      <img src={country.flags.png} alt={country.flag.alt} />
      <h2>Weather in {country.capital[0]}</h2>
      <WeatherData cityName={country.capital[0]} />
    </>
  );
};

export default CountryData;