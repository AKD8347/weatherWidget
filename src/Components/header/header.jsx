import React from "react";
import style from "./style.module.scss"
import {useState} from "react";

function Header(props) {
    //получаем состояние для города
    const [myCity, setCity] = useState('');
    //получаем состояние для региона
    const [myRegion, setRegion] = useState('');

    const myLocation = (event) => {
        const url = 'http://ipwho.is?output=json&lang=ru';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCity(data.city);
                setRegion(data.region);
            })
    }

    return (
        <header className={style.header}>
            <div className={style.header__search}>
                <input className={style.header__input} value="" placeholder="Поиск пр городу"/>
                <button className={style.header__submit}>Поиск</button>
            </div>
            <div className={style.header__location}>
                { myCity === '' ?
                    ( <h3 className={style.header__locationTitle}> </h3>)
                    :
                    ( <h3 className={style.header__locationTitle}>{myCity}, {myRegion} </h3>)
                }
                <button onClick={myLocation} className={style.header__locationSearch}>текущая локация</button>
            </div>
        </header>
    )
}

export default Header
