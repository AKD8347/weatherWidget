import React from "react";
import Day from '../day/day'
import style from "./style.module.scss";

function Week(props) {
    //props получаемые из родительского компонента
    const {data} = props;
    // console.log(data)
    const state = {
        days: []
    };

    if(data) {
        const dailyData = data.data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
        state.days = dailyData
    }

    function formatCards() {
        if(data) {
            return state.days.map((day, index) => <Day day={day} key={index}/>)
        } else {
            return false
        }
    }

    return (
        <div className={style.week}>
            {formatCards()}
        </div>
    )

}

export default Week
