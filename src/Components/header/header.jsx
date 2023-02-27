import React from "react";
import {useState} from "react";
import style from "./style.module.scss"

function Header({myLocation, myWaether}) {
    //api.openweathermap.org
    const keyWeather = 'd925d52adb9fbe2436832c756642ec13';
    //api.opencagedata.com
    const keyGeodata = '03ffaf043c004b47a1958e57654e54ca';
    // действия при изменении города в поле ввода
    const [city, setCity] = useState('');

    //определение локации пользователя по клику
    async function getLocation() {
        const url = 'http://ipwho.is?output=json&lang=ru';

        await fetch(url)
            .then(response => response.json())
            .then(data => {
                //callback-функция, возвращающая данные после ответа сервера
                console.log(data);
                myLocation({
                    city: data.city,
                    region: data.region,
                    country: data.country
                });
                getWeather({
                    lat: data.latitude,
                    long: data.longitude,
                    keyWeather
                })
            })
    }

    //поиск по городам
    async function searchCity(event) {
        let val = event.target.value;
        const url = new URL(`https://api.opencagedata.com/geocode/v1/json?q=${val}&key=${keyGeodata}&language=ru&pretty=1`);
        if (event.key === 'Enter') {
            await fetch(url.toString())
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    myLocation({
                        city: data.results[0].components.city,
                        region: data.results[0].components.region,
                        country: data.results[0].components.country
                    });
                })
        }
    }

    //по клику на кнопку поиска
    async function submitCity() {
        console.log(city);
        const url = new URL(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${keyGeodata}&language=ru&pretty=1`);
        await fetch(url.toString())
            .then(response => response.json())
            .then(data => {
                console.log(data);
                myLocation({
                    city: data.results[0].components.city,
                    region: data.results[0].components.region,
                    country: data.results[0].components.country
                });
            })
    }

    //получение погоды
    async function getWeather(location) {
        // console.log(location)
        let lat = '45.0392674';
        let long = '38.987221'
        const url = new URL(`https://api.openweathermap.org/data/3.0/onecall?exclude=hourly,daily&lang=ru`)
        if (location) {
            lat = location.lat;
            long = location.long;
        }
        url.searchParams.append('lat', lat);
        url.searchParams.append('lon', long);
        url.searchParams.append('appid', keyWeather);
        await fetch(url.toString())
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                myWaether(data);
            })
    }

    return (
        <header className={style.header}>
            <div className={style.header__search}>
                <input className={style.header__input}
                       placeholder="Поиск по городу"
                       onChange={event => setCity(event.target.value)}
                       value={city}
                       onKeyPress={searchCity}/>
                <button onClick={submitCity} className={style.header__submit}>Поиск</button>
            </div>
            <div className={style.header__location}>
                <button onClick={getLocation} className={style.header__locationSearch}>текущая локация</button>
            </div>
            <div className={style.header__location}>
                <button onClick={() => getWeather()} className={style.header__locationSearch}>погода</button>
            </div>
        </header>
    )
}

export default Header
