import React from "react";
import style from "./style.module.scss";


function LocationCity(props) {
    //props получаемые из родительского компонента
    const {data} = props;
    console.log(data);
    //получаем иконку погоды
    let iconUrl;
    if(data) {
        iconUrl = new URL(`http://openweathermap.org/img/wn/${data.data.weather[0].icon}.png`);
    }
    //nix timestamp в временной формат
    function getTime(time){
        let date = new Date(time * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    }


    return (
        <div className={style.location}>
            { !data ?
                (  <div className={style.location__wrapper}> </div>)
                :
                ( <div className={style.location__wrapper}>
                        <h3 className={style.location__title}>
                            <span>{data.city},</span>
                            { data.region === undefined ? ( <span>   </span>  ) : ( <span>{data.region},</span> ) }
                            <span>{data.country}</span>
                        </h3>
                        <div className={style.location__weather}>
                            <div className={style.location__main}>
                                <span className={style.location__temp}>{Math.round(data.data.main.temp)} &deg;</span>
                                <span className={style.location__icon}>
                                    <img src={iconUrl} alt={data.data.weather[0].description} />
                                </span>
                            </div>
                            <div className={style.location__details}>
                                <span className={style.location__item}>{data.data.weather[0].description}</span>
                                <span className={style.location__item}>Ощущается как:
                                    <span>{Math.round(data.data.main.feels_like)} &deg;</span>
                                </span>
                                <span className={style.location__item}>влажность:
                                    <span>{data.data.main.humidity} %</span>
                                </span>
                                <span className={style.location__item}>атмосферное давление(inHg):
                                    <span>{data.data.main.pressure}</span>
                                </span>
                                <span className={style.location__item}>скорость ветра:
                                    <span>{data.data.wind.speed} м/с</span>
                                </span>
                                <span className={style.location__item}>восхода:
                                    <span>{getTime(data.data.sys.sunrise)}</span>
                                </span>
                                <span className={style.location__item}>закат:
                                    <span>{getTime(data.data.sys.sunset)}</span>
                                </span>
                            </div>

                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default LocationCity;
