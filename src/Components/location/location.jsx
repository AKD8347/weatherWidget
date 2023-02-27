import React from "react";
import style from "./style.module.scss"

function LocationCity(props) {
    //props получаемые из родительского компонента
    const {city, region, country} = props;
    // console.log(city, region, country);

    return (
        <div className={style.location}>
            { city === '' ?
                ( <h3 className={style.location__title}> </h3>)
                :
                ( <h3 className={style.location__title}>
                    <span>{city},</span>
                    <span>{region},</span>
                    <span>{country}</span>
                  </h3>)
            }
        </div>
    )
}

export default LocationCity;
