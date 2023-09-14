import './App.css'

import { useEffect } from 'react'
import {Link, Routes , Route , useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import axios from 'axios'

import { getCountries, getActivities } from './components/redux/countrySlice';
import LandingPage from './components/Landing/landingPage'
import HomePage from "./components/Home/homePage";
import DetailPage from './components/Detail/detaiPage'
import NavBar from './components/NavBar/navBar'
import ActivityForm from './components/activityForm'
import BadRoute from './components/badRoute'

function App() {
  
  const {pathname} = useLocation()

  const dispatch = useDispatch()

  const URL = 'http://localhost:3001/countries'

  const URLA = 'http://localhost:3001/activities'

  useEffect(()=>{
    const getallCountriesAndActivities= async()=>{
        try {
          const {data} = await axios(URL)
          dispatch(getCountries(data))
    
          const res= await axios(URLA)
          dispatch(getActivities(res.data))
            
        }catch (error) {
          throw error.message
        }
    }
    getallCountriesAndActivities();

  },[])

  return (
    <div>
      {pathname !== '/' ? <NavBar /> : ''}
      
      <Link to="/" className="home-button">
      🏠
      </Link>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/details/:id" element={<DetailPage />} />
        <Route path="/activity" element={<ActivityForm />} />
        <Route path="*" element={<BadRoute />} />
      </Routes>
    </div>
  );
}

export default App
