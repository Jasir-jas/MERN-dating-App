import React from 'react'
import style from "./AroundMe.module.css"
const AroundMe = () => {
  return (
    <div className={style.container}>
        <h1>Around Me</h1>
        <h1 className={style.description}>People with <span className={style.span}>"Music"</span> interest around you</h1>
        <div className={style.map}>
          <img src="./map.png" alt="map" />
        </div>
    </div>
  )
}

export default AroundMe