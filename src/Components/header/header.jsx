import React from "react";
import style from "./style.module.scss"

function Header({myLocation}) {
    //определение локации по клику
    async function location() {
        const url = 'http://ipwho.is?output=json&lang=ru';
        await fetch(url)
            .then(response => response.json())
            .then(data => {
                //callback-функция, возвращающая данные после ответа сервера
                myLocation(data);
            })
    }

    return (
        <header className={style.header}>
            <div className={style.header__search}>
                <input className={style.header__input} value="" placeholder="Поиск пр городу"/>
                <button className={style.header__submit}>Поиск</button>
            </div>
            <div className={style.header__location}>
                <button onClick={location} className={style.header__locationSearch}>текущая локация</button>
            </div>
        </header>
    )
}

export default Header
