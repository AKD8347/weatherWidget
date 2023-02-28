import './App.scss';
import {useState} from "react";
import Header from "./Components/header/header";
import LocationCity from "./Components/location/location";

function App() {
    //заводим состояние для локации
    const [myCity, setCity] = useState('');

    //меняем значение, в зависимости от ответа сервера
    const myWeather = (data) => {
        // console.log(data)
        setCity(data)
    }

    return (
        <div className="wrapper">
            <Header
                myWaether={myWeather}
            />
            <LocationCity
                data={myCity}
            />
        </div>
    );
}

export default App;
