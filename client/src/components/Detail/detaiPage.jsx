import { useEffect } from 'react';
import { useParams } from "react-router-dom"
import { useDispatch, useSelector} from 'react-redux';

import axios from 'axios';

import { getCountryById } from '../redux/countrySlice';
import style from './detailPage.module.css'

const DetailPage = ()=>{

    const {id} = useParams()

    const URL = 'https://countries-production-b480.up.railway.app/countries'
    
    const dispatch = useDispatch()

    let country =''

    useEffect(()=>{
        const getCountryId = async()=>{
            try {
                const {data} = await axios(`${URL}/${id}`)
                dispatch(getCountryById(data))
            } catch (error) {
                
                throw error.message
            }
        }
        getCountryId()
    },[])
    
    country = useSelector(state=>state.country.country)
    
    if(!country) return(
        <h1 className={style.error}>No hay un país con esta ID{id}</h1>
    ) 
    return (
        
        <div className={style.details}> 
            <div>
                <img src={country.flags} alt={country.name} className={style.bandera}/><br/>
            </div>         
            <div className={style.paisInfo}>            
                <h1>{`${country.name} ( ${country.id} )`}</h1>
                <h2>{`Area: ${country.area} Km²`}</h2>
                <h2>{`Population: ${country.population}`}</h2>
                <h2>{`Continent: ${country.continents}`}</h2>
                <h2>{`Sub Region: ${country.subregion}`}</h2>
                <h2>{`Capital: ${country.capital}`}</h2>
            </div>
            
        </div>
    )
}


export default DetailPage