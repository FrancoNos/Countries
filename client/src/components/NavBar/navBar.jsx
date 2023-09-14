import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import {
  getCountries,
  orderByAtoZ,
  orderByPopulation,
  filterByContinent,
  filterByActivity,
  setCurrentPage,
} from "../redux/countrySlice";
import SearchBar from "../Search/searchBar";
import style from "./navBar.module.css";

const NavBar = () => {
  const activities = useSelector((state) => state.country.activities);

  const names = activities.map((activity) => {
    return activity.name;
  });
  const setOfNames = new Set(names);

  const activitiesNames = Array.from(setOfNames);

  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const URL = "http://localhost:3001/countries";

  const getallCountries = async () => {
    try {
      const { data } = await axios(URL);

      dispatch(getCountries(data));
    } catch (error) {
      throw error.message;
    }
  };

  const handleOrderByAtoZ = (event) => {
    dispatch(orderByAtoZ(event.target.value));
  };

  const handleOrderByPopulation = (event) => {
    dispatch(orderByPopulation(event.target.value));
  };

  const handleFilterbyContinent = (event) => {
    event.target.value !== "All"
      ? dispatch(filterByContinent(event.target.value))
      : getallCountries();
    dispatch(setCurrentPage(0));
  };

  const handleFilterbyActivity = (event) => {
    event.target.value !== "No Activity"
      ? dispatch(filterByActivity(event.target.value))
      : getallCountries();
    dispatch(setCurrentPage(0));
  };

  return (
    <div className={style.navBar}>
      {pathname !== "/home" ? (
        <div className={style.buttons}>
          <Link to="/home">
            <button className={style.navBarbutton}>Home</button>
          </Link>
        </div>
      ) : null}

      <div className={style.search}>
        {pathname === "/home" ? <SearchBar /> : null}
      </div>

      <div className={style.orders}>
       

      <div className={style.filter}>
        {pathname === "/home" ? (
          <div>
            <select name="continents" onChange={handleFilterbyContinent}>
              <option selected disabled>
                Filtrar por continente
              </option>
              <option value="Europe">Europa</option>
              <option value="Oceania">Oceanía</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="South America">America del Sur</option>
              <option value="North America">America del Norte</option>
              <option value="Antarctica">Antartida</option>
              <option value="All">Todos</option>
            </select>
          </div>
        ) : null}

        <div>
          {pathname === "/home" && activitiesNames.length > 0 ? (
            <select name="activities" onChange={handleFilterbyActivity}>
              <option selected disabled>
                Filtrar por Actividad
              </option>
              {activitiesNames.map((name) => {
                return (
                  <option key={name} value={name}>
                    {name.slice(0, 1).toUpperCase() + name.slice(1)}
                  </option>
                );
              })}
              <option value="No Activity">Sin Actividad</option>
            </select>
          ) : null}
        </div>
      </div>

      {pathname === "/home" ? (
          <div>
            <select name="alphabetical" onChange={handleOrderByAtoZ}>
              <option selected disabled>
                Orden alfabetico
              </option>
              <option value="A">Desde la A a la Z</option>
              <option value="D">Desde la Z a la A</option>
              <option value="NOrder">Sin orden</option>
            </select>
          </div>
        ) : null}

        {pathname === "/home" ? (
          <div>
            <select name="population" onChange={handleOrderByPopulation}>
              <option selected disabled>
                Orden población
              </option>
              <option value="A">Población ↓</option>
              <option value="D">Población ↑</option>
              <option value="NOrder">Sin orden</option>
            </select>
          </div>
        ) : null}
      </div>

      {pathname !== "/activity" ? (
        <div className={style.activity}>
          <Link to="/activity">
            <button className={style.navBarbutton}>Crear Actividad</button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;
