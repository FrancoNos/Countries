import { Link } from "react-router-dom"
import PropTypes from 'prop-types';

import style from './countryCard.module.css'

const CountryCard = ({ id, name, flags, continents }) => {
    return (
      <div className={style.card}>
        <Link to={`/details/${id}`} className={style.nameLink}>
          <div>
            <img src={flags} alt={`Flag of ${name}`} className={style.cimage} />
          </div>
          <div>
            <h2>{`${name}`}</h2>
            <h2>{`${continents}`}</h2>
          </div>
        </Link>
      </div>
    );
  };
  
  
  CountryCard.propTypes = {
    id: PropTypes.number.isRequired, 
    name: PropTypes.string.isRequired,
    flags: PropTypes.string.isRequired,
    continents: PropTypes.string.isRequired,
  };
  
  export default CountryCard;