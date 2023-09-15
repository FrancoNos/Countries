import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import axios from 'axios';

import { getCountryByName } from '../redux/countrySlice'
import style from './searchBar.module.css'

const SearchBar = ()=>{
    const URL = 'https://countries-production-b480.up.railway.app/countries'

    const dispatch = useDispatch();

    const [search,setSearch] = useState('')

    const [error,setError] = useState('')

    const handleChange = (e) =>{
    
        if(/^[a-zA-Z\s]*$/.test(e.target.value)){
            setSearch(e.target.value.trim())
        }
    }

    useEffect(()=>{
        setError('')
        const handleSearch = async()=>{
            try {
                const {data} = await axios(`${URL}?name=${search}`)
                dispatch(getCountryByName(data))
                
            } catch (error) {
                setError(error.message)
            }
        }

        handleSearch() 
    },[search])

    return (
        <div>
            <div className={style.search}>
                <input placeholder="Busca tu país..."  id="input-field" type='search' value={search} onChange={handleChange} className={style.searchInput}/>
                {
                    error && <p>Este país no existe</p>
                }
            </div>
        </div>
    )
}

export default SearchBar