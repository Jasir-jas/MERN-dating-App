import React from 'react'
import style from "./NotificationsMessage.module.css"
import { IoClose } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import { FiAlertCircle } from "react-icons/fi";
import { IoMdCloseCircleOutline } from "react-icons/io";

const NotificationNews = ({type={}}) => {
  return (
    <div className={style['not-news-cont']}>
                  <button className={style['cls-btn']}><IoClose className={style['cls-sym']}/></button>
                  <div className={style['news-cont']}>
                        {type?.Name==="News"&&<span className={style['news-title']}>News</span>}
                        <div className={style['title-cont']}>
                            {type.Name!=="News"&&(type.Name==="Success"?
                              <SiTicktick className={style['title-suc']}/>:
                              type.Name==="Alert"?
                              <FiAlertCircle className={style['title-alt']}/>:
                              <IoMdCloseCircleOutline className={style['title-err']}/>)
                             }
                            <h1 className={style['title']}>{type.Title}</h1>
                        </div>
                        {type?.Description&&<p className={style['body']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, magnam porro. Aspernatur illo dignissimos nihil vitae dolor temporibus explicabo quisquam est nobis atque quasi quo consectetur, beatae commodi cumque enim ad ex?</p>}
                        <span className={style['body']}>Today 10:32 PM</span>
                  </div>
            </div>
  )
}

export default NotificationNews