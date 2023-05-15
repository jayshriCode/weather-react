import React, { useEffect, useState } from 'react'
import "./style.css"
import TempCard from './TempCard';

const Temp = () => {
    const [searchValue, setSearchValue] = useState('mumbai');
    const [weatherInfo, setWeatherInfo] = useState({});
    const getWeatherInfo = async () => {

        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=4be4f8b11bbd774f037e5c6e73984290`;
            let res = await fetch(url);
            let data = await res.json();
            const {temp, humidity, pressure } = data.main;
            const {main:weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind
            const {country, sunset} = data.sys;
            const myNewWeatherInfo ={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed, country,
                sunset,
            };
            setWeatherInfo(myNewWeatherInfo);
            // console.log(temp);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getWeatherInfo();
    }, [])
    return (
        <>
            <div className="wrap my-2">
                <div className="search">
                    <input className='searchTerm' type="search" placeholder='search...' autoFocus id='search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <button className="searchButton" type='button' onClick={getWeatherInfo}>
                        Search
                    </button>
                </div>
            </div>
            {/* Our temp card */}
           <TempCard weatherInfo={weatherInfo} />
        </>
    )
}

export default Temp
