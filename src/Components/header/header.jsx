import React from "react";
import {useState} from "react";
import style from "./style.module.scss"

function Header({myWaether}) {
    //api.openweathermap.org
    const keyWeather = 'd925d52adb9fbe2436832c756642ec13';
    //api.opencagedata.com
    const keyGeodata = '03ffaf043c004b47a1958e57654e54ca';
    // действия при изменении города в поле ввода
    const [city, setCity] = useState('');

    //определение локации пользователя через сервис ipwho.is
    async function getLocation() {
        const url = 'http://ipwho.is?output=json&lang=ru';
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                //callback-функция, возвращающая данные после ответа сервера
                getWeather({
                    city: data.city,
                    region: data.region,
                    country: data.country,
                    lat: data.latitude,
                    long: data.longitude,
                    keyWeather
                })
            })
    }

    //запрос на сервис api.opencagedata.com
    async function getGeo(url) {
        await fetch(url.toString())
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                getWeather({
                    city: data.results[0].components.city,
                    region: data.results[0].components.region,
                    country: data.results[0].components.country,
                    lat: data.results[0].geometry.lat,
                    long: data.results[0].geometry.lng,
                    keyWeather
                })
            }).catch(error => {
                console.log(error);
            })
    }

    //поиск по городам
    function searchCity(event) {
        let val = event.target.value;
        const url = new URL(`https://api.opencagedata.com/geocode/v1/json?q=${val}&key=${keyGeodata}&language=ru&pretty=1`);
        if (event.key === 'Enter') {
           getGeo(url);
        }
    }

    //по клику на кнопку поиска
    function submitCity() {
        // console.log(city);
        const url = new URL(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${keyGeodata}&language=ru&pretty=1`);
        getGeo(url);
    }

    //получение погоды
    async function getWeather(location) {
        // console.log(location)
        let lat = '45.0392674';
        let long = '38.987221'
        const url = new URL(`https://api.openweathermap.org/data/2.5/weather?&units=metric`);

        if (location) {
            lat = location.lat;
            long = location.long;
        }
        url.searchParams.append('lat', lat);
        url.searchParams.append('lon', long);
        url.searchParams.append('lang', 'ru')
        url.searchParams.append('APPID', keyWeather);
        await fetch(url.toString())
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                if (location) {
                    myWaether({
                        city: location.city,
                        region: location.region,
                        country: location.country,
                        data: data
                    });
                } else {
                    myWaether({
                        city: 'Краснодар',
                        region: 'Краснодарский край',
                        country: 'Россия',
                        data: data
                    });
                }
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
