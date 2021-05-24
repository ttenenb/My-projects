import React from 'react';

function WeatherDetail({ details: { name, main, wind, weather, sys } }) {
    return (
        <div className='container-fluid weather'>
            <h2>The weather for {name}:</h2>
            <div>
                <img src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`} alt={main.temp} />
                <h2>{weather[0].description.toUpperCase()}</h2>
            </div>
            <h3>{Math.round(main.temp)} Degrees</h3>
            <h4>
                Wind is felt at {Math.round(wind.speed)}
                <a href='https://en.wikipedia.org/wiki/Miles_per_hour' target="_blank" rel="noopener noreferrer"> mph</a>
            </h4>
            <br></br>
            <div id='sun'>
                <img src={'img/sun.jpg'} alt={'Sun'} />
            </div>
            <h6 className='m-3'>
                Sunrise today: {new Date(sys.sunrise * 1000).toLocaleTimeString()}
            </h6>
            <h6>
                Sunset today: {new Date(sys.sunset * 1000).toLocaleTimeString()}
            </h6>
        </div>
    )
}

export default WeatherDetail;
