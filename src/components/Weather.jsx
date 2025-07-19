import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import clear from '../assets/clear.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import heavy_clouds from '../assets/heavy_clouds.png'
import storm from '../assets/storm.jpg'
import mist from '../assets/mist.png'


const Weather = () => {

  const [weatherData, setWeatherState] = useState({})
  const [newCity, setNewCity] = useState('london')

  const search = async (newCity) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric&appid=${import.meta.env.VITE_APP_ID}` 
      
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      

      const allIcons = {
        "01d": clear,"01n": clear,
        "02d": cloud,"02n": cloud,
        "03d": cloud,"03n": cloud,
        "04d": heavy_clouds,"04n": heavy_clouds,
        "09d": drizzle,"09n": drizzle,
        "10d": rain,"10n": rain,
        "11d": storm,"11n": storm,
        "13d": snow,"13n": snow,
        "50d": mist,"50n": mist,
      }

      const myIcon = allIcons[data.weather[0].icon] || clear
      // console.log(myIcon)
      setWeatherState({  
        humidity: Math.floor(data.main.humidity),
        temp: Math.floor(data.main.temp),
        windSpeed: Math.floor(data.wind.speed),
        location: data.name,
        icon: myIcon
      })

     
    }
    
    catch(error){
      console.log(`${newCity} does not exists`)

    }
  }

  useEffect(() => {
  search(newCity);
}, []);


  return (
    <div className='weather'>
        <div className="search-bar">
            <input className="search_bar" type="text" value={newCity} placeholder='Search' onChange={(e) => setNewCity(e.target.value)} />
            <img 
              src={search_icon} 
              alt="search_icon"
              onClick={() => { 
                          search(newCity)
                          setNewCity('');
                        }
                        }  />
        </div>
        <img src={weatherData.icon} alt="weather_icon" className='weather-icon' />
        <p className='temperature'>{weatherData.temp}°c</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={humidity} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
          </div>
          <div className="col">
            <img src={wind} alt="" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Weather
