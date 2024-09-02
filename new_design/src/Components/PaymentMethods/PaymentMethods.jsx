import style from "./PaymentMethods.module.css"
import { IoClose } from "react-icons/io5";
import React from 'react'
import PaymentCard from "./PaymentCard"
import CurrentMethod from "./CurrentMethod"

const PaymentMethods = () => {
  return (
    <section className={style.container}>
        <div className={style.payment}>
            <div className={style.header}>
                <div className={style.headerbtns}>
                    <button className={style.cls}><IoClose/></button>
                    <button>Done</button>
                </div>
                <div className={style.headercnts}>
                    <h1>Payment Methods</h1>
                    <p>distinctio, enim maiores repellendus, debitis eos? Ullam, maxime </p>
                </div>
            </div>
            <div className={style.content}>
                 <PaymentCard/>
                 <PaymentCard/>
                 <PaymentCard/>
                 <CurrentMethod/>
                 <div className={style.addbtn}>
                    <button>ADD PAYMENT METHOD</button>
                 </div>
            </div>
        </div>
    </section>
  )
}

export default PaymentMethods