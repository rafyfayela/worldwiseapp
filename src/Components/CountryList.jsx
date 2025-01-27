import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../Contexts/CitiesContext";
function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;
  const countrySet = new Set();
  const countries = cities.reduce((arr, city) => {
    if (!countrySet.has(city.country)) {
      countrySet.add(city.country);
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
    return arr;
  }, []);

  console.log(countries);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
