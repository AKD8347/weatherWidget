import './App.scss';
import React, {useState} from "react";
import Header from "./Components/header/header";
import WeatherDay from "./Components/location/WeatherDay";
import WeatherWeek from "./Components/week/WeatherWeek";

function App() {
    //заводим состояние для локации
    const [weather, setWeather] = useState(null);

    //меняем значение, в зависимости от ответа сервера
    const myWeather = (data) => {
        console.log(data)
        setWeather(data);
    }

    return (
        <div className="wrapper">
            <Header
                myWaether={myWeather}
            />
            {weather !== null ? (
                <div className="wrapper__descr">
                    <h3 className="wrapper__title">
                        {weather.city === undefined ? null : (<span>{weather.city},</span>)}
                        {weather.region === undefined ? null : (<span>{weather.region},</span>)}
                        {weather.country === undefined ? null : (<span>{weather.country}</span>)}
                    </h3>
                </div>
            ) : null}
            {weather && weather.isOneDay ?
                (
                    <WeatherDay
                        data={weather}
                    />
                ) : (
                    <WeatherWeek
                        data={weather}
                    />
                )
            }
        </div>
    );
}

export default App;
