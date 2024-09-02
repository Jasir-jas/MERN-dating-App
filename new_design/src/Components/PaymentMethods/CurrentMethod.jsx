import React from 'react'
import money from "../../assets/money.png"
import style from "./CurrentMethod.module.css"

const CurrentMethod = () => {
  return (
    <div className={style.container}>
        <h1>current method</h1>
        <div className={style.content}>
            <img src={money} alt="dollar" />
            <div className={style.paymenttype}>
                <h1>Cash payment</h1>
                <span>Default method</span>
            </div>
            <select name="" id=""></select>
        </div>
    </div>
  )
}

export default CurrentMethod