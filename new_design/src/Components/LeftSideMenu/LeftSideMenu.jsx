import React from 'react'
import style from "./LeftSideMenu.module.css"
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
const LeftSideMenu = ({isService}) => {
  const navigate=useNavigate()
  return <>{isService && <section className={style['left-men-cont']}>
        <ul className={style['nav-body-cont']}>
            <button className={style['left-cls-btn']}><IoMdCloseCircleOutline/></button>
            <li className={style['nav-list']} onClick={()=>navigate("/matrimony")}>Matrimony</li>
            <li className={style['nav-list']}>Dating</li>
            <li className={style['nav-list']}>E commerce</li>
            <li className={style['nav-list']}>Study abroad</li>
            <li className={style['nav-list']}>Job portal</li>
        </ul>
    </section>}
  </>
}

export default LeftSideMenu