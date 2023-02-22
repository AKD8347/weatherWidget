import './App.scss';
import {useState} from "react";
import Header from "./Components/header/header";
import LocationCity from "./Components/location/location";

function App() {
    //заводим состояние для города
    const [myCity, setCity] = useState('');
    //заводим состояние для региона
    const [myRegion, setRegion] = useState('');
    //меняем значение, в зависимости от ответа сервера
    const myLocation = (data) => {
        setCity(data.city)
        setRegion(data.region)
        // console.log(data);
    }

    return (
        <div className="wrapper">
            <Header
                myLocation={myLocation}
            />
            <LocationCity
                city={myCity}
                region={myRegion}
            />
        </div>
    );
}

export default App;
