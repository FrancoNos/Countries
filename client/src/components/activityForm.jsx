import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getActivities, postActivity } from "../components/redux/countrySlice";
import style from "./activityForm.module.css";

const ActivityForm = () => {
  const navigate = useNavigate();
  const URL = "https://countries-production-b480.up.railway.app/activities";
  const dispatch = useDispatch();
  const countriesForActivityOnly = useSelector(
    (state) => state.country.countriesForActivityOnly
  );

  const [activityData, setActivityData] = useState({
    name: "",
    duration: "",
    dificulty: "",
    season: "",
    countries: [],
  });

  const [error, setError] = useState({});

  const [creating, setCreating] = useState(false);

  useEffect(() => {
    validate();
  }, [activityData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setActivityData((prevData) => ({
      ...prevData,
      [name]:
        name === "countries"
          ? prevData.countries.includes(value)
            ? prevData.countries.filter((country) => country !== value)
            : [...prevData.countries, value]
          : value,
    }));
    validate();
  };

  const validate = () => {
    const errorValidate = {};

    if (activityData.name.length === 0) {
      errorValidate.name = "Debe tene un nombre.";
    }

    if (activityData.name.length >= 30) {
      errorValidate.name = "Debe tener hasta 30 caracteres.";
    }

    if (
      activityData.name.length > 0 &&
      !/^[a-zA-ZñÑ\s]*$/.test(activityData.name)
    ) {
      errorValidate.name = "El nombre debe tener solo caracteres.";
    }

    if (isNaN(Number(activityData.duration))) {
      errorValidate.duration = "La duración debe ser un número.";
    }

    if (
      Number(activityData.duration) > 130 ||
      Number(activityData.duration) < 0
    ) {
      errorValidate.duration =
        "Las actividades pueden tener un máximo de 129 horas, sin número negativos.";
    }

    if (Number(activityData.duration) === 0) {
      errorValidate.duration =
        " Las actividades no pueden tener 0 horas de duración.";
    }

    setError(errorValidate);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(error).length === 0) {
      setCreating(true);

      try {
        const { data } = await axios.post(URL, activityData);
        dispatch(postActivity(data));
        const info = await axios(URL);
        dispatch(getActivities(info.data));

        window.alert("Actividad creada.");
        navigate("/home");
      } catch (error) {
        setCreating(false);
        throw window.alert("Hay una opción sin datos.");
      }
    }
  };

  return (
    <div className={style.activityForm}>
      <div className={style.form}>
        <h1>Crear una actividad</h1>
        <form onSubmit={handleSubmit}>
          <div className={style.nameInput}>
            <label htmlFor="name">Nombre de la actividad:</label>
            <br />
            <input
              required=""
              type="text"
              name="name"
              value={activityData.name}
              onChange={handleChange}
              className={style.nameInp}
            />
            {error.name ? <p>{error.name}</p> : null}
          </div>

          <div className={style.dificultySelect}>
            <select name="dificulty" onChange={handleChange}>
              <option disabled selected>
                Dificultad
              </option>
              <option value="1">Muy facil</option>
              <option value="2">Facil</option>
              <option value="3">Medio</option>
              <option value="4">Dificil</option>
              <option value="5">Extremo</option>
            </select>
          </div>
          <br />

          <div className={style.seasonSelect}>
            <select name="season" onChange={handleChange}>
              <option disabled selected>
                Estación
              </option>
              <option value="Summer">Verano</option>
              <option value="Fall">Otoño</option>
              <option value="Winter">Invierno</option>
              <option value="Spring">Primavera</option>
            </select>
          </div>
          <br />

          <div className={style.durationInput}>
            <label>Duración en horas:</label>
            <br />
            <input
              required=""
              type="text"
              name="duration"
              value={activityData.duration}
              onChange={handleChange}
            />
            {error.duration ? <p>{error.duration}</p> : null}
          </div>

          <div className={style.countrySelect}>
            <span>Elige un país:</span>
            <br />
            <select name="countries" onChange={handleChange}>
              <option disabled selected>
                ...
              </option>
              {countriesForActivityOnly.map(({ id, name }) => (
                <option value={id} key={id + name}>
                  {`${name} (${id})`}
                </option>
              ))}
            </select>
          </div>
          <br />

          {activityData.countries.length ? (
            <span className={style.countrySpan}>
              Click para borrar un país.
            </span>
          ) : null}

          <div className={style.countryButtons}>
            {activityData.countries
              ? activityData.countries.map((element, index) => (
                  <button
                    key={index}
                    onClick={(e) => handleChange(e)}
                    name="countries"
                    value={element}
                  >
                    {element}
                  </button>
                ))
              : null}
          </div>
          <br />
          <br />

          <div className={style.submit}>
            <button disabled={creating}>Mandar información</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;
