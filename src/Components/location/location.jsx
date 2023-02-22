import React from "react";
import style from "./style.module.scss"

function LocationCity(props) {
    //props получаемые из родительского компонента
    const {city, region} = props;
    console.log(city, region);

    return (
        <div className={style.location}>
            { city === '' ?
                ( <h3 className={style.location__title}> </h3>)
                :
                ( <h3 className={style.location__title}>{city}, {region}</h3>)
            }
        </div>
    )
}

export default LocationCity;
