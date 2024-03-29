// import { useSearchParams } from 'react-router-dom'
 import styles from "./City.module.css";
// import { useEffect, useState } from 'react';
import { useEffect} from 'react';
import { useParams } from 'react-router-dom'
import { useCities } from '../contexts/CitiesContext';
 import PropTypes from 'prop-types';
import BackButton from "./BackButton";
// import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
    const {id} = useParams()
    const {getCity,
        currentCity,
        // isLoading,
      } = useCities();

    useEffect(
      function(){
      getCity(id)
    }, [id, getCity]);
    
const {cityName, emoji, date, notes} = currentCity;
// if (isLoading) return (<Spinner/>)
    
    // const [searchParams, setSearchParams] = useSearchParams();
    // const lat = searchParams.get("lat");
    // const lng = searchParams.get("lng")
    
  
    

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}
      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <BackButton/>
      </div>
    </div>
  );
}



City.propTypes = {
  currentCity: PropTypes.shape({
    // Define the structure of the currentCity object
    // For example, assuming currentCity has properties like name, population, etc.
    name: PropTypes.string.isRequired,
    population: PropTypes.number.isRequired,
    // Add more properties as needed
  }).isRequired,
  getCity: PropTypes.func.isRequired,
};

export default City;
