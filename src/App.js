import './App.scss';
import {useState} from "react";
import Header from "./Components/header/header";
import LocationCity from "./Components/location/location";

function App() {
    //заводим состояние для города
    const [myCity, setCity] = useState('');
    //заводим состояние для региона
    const [myRegion, setRegion] = useState('');
    //заводим состояние для страны
    const [myCountry, setCountry] = useState('');
    //меняем значение, в зависимости от ответа сервера
    const myLocation = (data) => {
        setCity(data.city)
        setRegion(data.region)
        setCountry(data.country)
        console.log(data);
    }

    return (
        <div className="wrapper">
            <Header
                myLocation={myLocation}
            />
            <LocationCity
                city={myCity}
                region={myRegion}
                country={myCountry}
            />
        </div>
    );
}

export default App;
