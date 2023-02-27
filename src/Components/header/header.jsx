import React from "react";
import style from "./style.module.scss"

function Header({myLocation, myWaether}) {

    const key = 'd925d52adb9fbe2436832c756642ec13';
    //определение локации по клику
    async function getLocation() {
        const url = 'http://ipwho.is?output=json&lang=ru';
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                //callback-функция, возвращающая данные после ответа сервера
                myLocation(data);
                getWeather({
                    lat: data.latitude,
                    long: data.longitude,
                    key
                })
            })
    }

    //получение погоды
    async function getWeather(location) {
        console.log(location)
        let lat = '45.0392674';
        let long = '38.987221'
        const url = new URL(`https://api.openweathermap.org/data/3.0/onecall?exclude=hourly,daily&lang=ru`)
        if (location) {
            lat = location.lat;
            long = location.long;
        }
        url.searchParams.append('lat', lat);
        url.searchParams.append('lon', long);
        url.searchParams.append('appid', key);
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
                <input className={style.header__input} value="" placeholder="Поиск по городу"/>
                <button className={style.header__submit}>Поиск</button>
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
