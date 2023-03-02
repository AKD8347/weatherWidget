import './App.scss';
import React, {useState} from "react";
import Header from "./Components/header/header";
import LocationCity from "./Components/location/location";
import Week from "./Components/week/week";
import style from "./Components/location/style.module.scss";

function App() {
    //заводим состояние для локации
    const [weather, setWeather] = useState(null);

    //меняем значение, в зависимости от ответа сервера
    const myWeather = (data) => {
        setWeather(data);
    }

    return (
        <div className="wrapper">
            <Header
                myWaether={myWeather}
            />
            {weather !== null ? (<div>
                <h3>{weather.city}</h3>
                <h3>{weather.city}</h3>
                <h3>{weather.city}</h3>
            </div>) : null }
            {weather && weather.isOneDay ?
                (<LocationCity
                data={weather}
            />) : (<Week
                    data={weather}
                />)
            }
        </div>
    );
}

export default App;
