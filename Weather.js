import React, { useEffect, useState } from 'react';
import WeatherDetail from './WeatherDetail';
import './Weather.css';
import { myKey } from './myKey';

function Weather({ setError, setLoading }) {
    const [weather, setWeather] = useState();

    const units = 'imperial';

    useEffect(() => {

        let options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        const success = (pos) => {
            const crd = pos.coords;

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${myKey}&units=${units}`)
                .then(r => r.json())
                .then(weatherData => {
                    setWeather(weatherData)
                })
                .catch(e => console.error(e));

        }

        const error = (err) => {
            setError(`ERROR(${err.code}): ${err.message}`);
        }


        navigator.geolocation.getCurrentPosition(success, error, options)

    }, [setError]);

    const zipChange = async e => {
        e.preventDefault();
        if (e.target.value.length === 5) {
            try {
                const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?appid=${myKey}&zip=${e.target.value}&units=${units}`);
                const zipWeather = await response.json();
                if (!response.ok) {
                    throw new Error(zipWeather.message || response.statusText)
                }
                setWeather(zipWeather);
            } catch (error) {
                setError(`ERROR : ${error.message}`);
            }
            finally {
                e.target.value = '';
                e.target.blur();
            }
        }
    }

    if (weather) {
        setLoading(false);
    }

    const display = weather ? <WeatherDetail details={weather} /> : setLoading(true);

    return (
        <>
            <div className='weather'>
                <input type='number' name='zip' placeholder='Enter Zip' onChange={zipChange} />
                <div>
                    {display}
                </div>
            </div>
            {/*Credit given to openweatherapi for all weather reports*/}
        </>
    )
}

export default Weather
