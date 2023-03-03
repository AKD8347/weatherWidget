import React from "react";
import style from "./style.module.scss";

function Day(props) {

    const {day} = props;

    let iconUrl;
    if (day) {
        iconUrl = new URL(`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`);
    }

    const ms = day.dt * 1000;
    const weekdayName = new Date(ms).toLocaleString('ru', {weekday: 'long'});


    return (
        <div className={style.day}>
            <h3 className={style.day__title}>{weekdayName}</h3>
            <span className={style.day__icon}>
                <img src={iconUrl} alt={day.weather[0].description}/>
            </span>
            <p className={style.day__temp}>{Math.round(day.main.temp)} &deg;C</p>
            <p className={style.day__descr}>{day.weather[0].description}</p>
        </div>
    )
}

export default Day;
