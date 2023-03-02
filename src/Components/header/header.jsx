import React from "react";
import {useState} from "react";
import style from "./style.module.scss"
//переменная для
let currentLocation = null;

function Header({myWaether}) {
    //api.openweathermap.org
    const keyWeather = 'd925d52adb9fbe2436832c756642ec13';
    //api.opencagedata.com
    const keyGeodata = '03ffaf043c004b47a1958e57654e54ca';
    // действия при изменении города в поле ввода
    const [city, setCity] = useState('');
    // действие для отображения кнопок
    const [isShowWeatherBtn, setIsShowWeatherBtn] = useState(false);
    //определение локации пользователя через сервис ipwho.is
    async function getLocation() {
        const url = 'http://ipwho.is?output=json&lang=ru';
        setCity('');
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                //callback-функция, возвращающая данные после ответа сервера
                currentLocation = {
                    city: data.city,
                    region: data.region,
                    country: data.country,
                    lat: data.latitude,
                    long: data.longitude,
                    keyWeather
                }
                getWeather(false)
                setIsShowWeatherBtn(true);
            }).catch(error => {
                console.log(error);
                setIsShowWeatherBtn(false);
            })
    }

    //запрос на сервис api.opencagedata.com
    async function getGeo(url) {
        await fetch(url.toString())
            .then(response => response.json())
            .then(data => {
                const locationInfo = data.results[0];

                currentLocation = {
                    city: locationInfo.components.city,
                    region: locationInfo.components.region,
                    country: locationInfo.components.country,
                    lat: locationInfo.geometry.lat,
                    long: locationInfo.geometry.lng,
                };
                getWeather(false)
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
            setIsShowWeatherBtn(true);
        }
    }

    //по клику на кнопку поиска
    function submitCity() {
        const url = new URL(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${keyGeodata}&language=ru&pretty=1`);
        getGeo(url);
        setIsShowWeatherBtn(true);
    }

    //получение погоды
    async function getWeather(isOneDay) {
        // console.log(location)
        let lat = '59.9387';
        let long = '30.3162'
        const url = new URL(`https://api.openweathermap.org/data/2.5/forecast?&units=metric&&exclude=daily`);

        if (currentLocation) {
            lat = currentLocation.lat;
            long = currentLocation.long;
        }
        url.searchParams.append('lat', lat);
        url.searchParams.append('lon', long);
        url.searchParams.append('lang', 'ru')
        url.searchParams.append('APPID', keyWeather);
        await fetch(url.toString())
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                if (currentLocation) {
                    myWaether({
                        city: currentLocation.city,
                        region: currentLocation.region,
                        country: currentLocation.country,
                        data,
                        isOneDay
                    });
                } else {
                    myWaether({
                        city: 'Санкт-Петербург',
                        region: 'Северо-Западный федеральный округ',
                        country: 'Россия',
                        data,
                        isOneDay
                    });
                }
            }).catch(error => {
                console.log(error);
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
            {isShowWeatherBtn &&
                (
                    <div className={style.header__location}>
                        <button onClick={() => getWeather(true)} className={style.header__locationSearch}>погода за день
                        </button>
                    </div>
                )}
            {isShowWeatherBtn &&
                (
                    <div className={style.header__location}>
                        <button onClick={() => getWeather()} className={style.header__locationSearch}>погода за 5 дней
                        </button>
                    </div>
                )}
        </header>
    )
}

export default Header
