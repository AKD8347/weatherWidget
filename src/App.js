import './App.scss';
import {useState} from "react";
import Header from "./Components/header/header";
import LocationCity from "./Components/location/location";
import Week from "./Components/week/week";

function App() {
    //заводим состояние для локации
    const [weather, setWeather] = useState('');

    //меняем значение, в зависимости от ответа сервера
    const myWeather = (data) => {
        setWeather(data)
    }

    return (
        <div className="wrapper">
            <Header
                myWaether={myWeather}
            />
            <LocationCity
                data={weather}
            />

        </div>
    );
}

export default App;
