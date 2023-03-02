import React from "react";
// import {useState} from "react";
import style from "./style.module.scss";

function Week(props) {
    //props получаемые из родительского компонента
    const {data} = props;

    console.log(data);

    return (
        <div className={style.week}>

        </div>
    )

}

export default Week
