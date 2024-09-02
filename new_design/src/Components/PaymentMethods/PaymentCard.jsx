import React, { useState } from 'react'
import MasterCard from "../../assets/mastercard.png"
import style from "./PaymentCard.module.css"


const PaymentCard = () => {
    const [clicked,setClicked] = useState(false)
  return (
    <div className={`${style.container} ${clicked?style.clicked:""}`} onClick={()=>setClicked(prev=>!prev)}>
        <img src={MasterCard} alt="card" className={style.image}/>
        <div className={style.text}>
            <h1>*********455</h1>
            <span>Expires 06/5</span>
        </div>
    </div>
  )
}

export default PaymentCard