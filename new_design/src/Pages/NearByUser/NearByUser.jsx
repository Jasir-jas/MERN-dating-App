import React from 'react'
import style from "./NearByUser.module.css"
import { PiLessThan } from "react-icons/pi";
import SpinBtn from './SpinBtn';
import { RiCheckDoubleLine } from "react-icons/ri";
const NearByUser = () => {
  return (
    <div className={style['container']}>
        <div className={style['back-btn-cont']}>
            <button className={style['back-btn']}>
                <PiLessThan/>
            </button>
        </div>
        <div className={style['body']}>
        {/* <div> */}
            <h1>1 km near you</h1>
            <div className={style['img-container']}>
                <img src="./avatar2.jpg" alt="img" />
            </div>
            <div className={style['name-cont']}>
                <h1 className={style['name']}>Name - 27</h1>
                <button className={style['like-btn']}><RiCheckDoubleLine/>Like</button>
            </div>
        {/* </div> */}
        </div>
        <SpinBtn/>
    </div>
  )
}

export default NearByUser