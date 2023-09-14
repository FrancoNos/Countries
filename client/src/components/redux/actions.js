const getAllCountries = () =>{
    return dispatch =>
        fetch("http://localhost:3001/countries")
        .then((res) => res.json())
    .then((payload) => {
        dispatch({type:"GET_ALL_COUNTRIES", payload})
    })
    .catch(error=>console.warn(error))
}

export default getAllCountries