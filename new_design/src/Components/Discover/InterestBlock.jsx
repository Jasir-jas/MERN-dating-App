import React from 'react'
import style from "./InterestBlock.module.css"

const InterestBlock = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.header}>
        <h1>Interests</h1>
        <button className={style.headerBtn}>View all</button>
      </div>
      <div className={style.interests}>
        <div className={style.intrstCont}>
          <button className={style.interestBtn}><img src="./music.png" alt="m" className={style.img} />music</button>
        </div>
        <div className={style.intrstCont}>
          <button className={style.interestBtn}><img src="./music.png" alt="m" className={style.img} />music</button>
        </div>
        <div className={style.intrstCont}>
          <button className={style.interestBtn}><img src="./music.png" alt="m" className={style.img} />music</button>
        </div>
        <div className={style.intrstCont}>
          <button className={style.interestBtn}><img src="./music.png" alt="m" className={style.img} />music</button>
        </div>
        <div className={style.intrstCont}>
          <button className={style.interestBtn}><img src="./music.png" alt="m" className={style.img} />music</button>
        </div>
        <div className={style.intrstCont}>
          <button className={style.interestBtn}><img src="./music.png" alt="m" className={style.img} />music</button>
        </div>
        <div className={style.intrstCont}>
          <button className={style.interestBtn}><img src="./music.png" alt="m" className={style.img} />music</button>
        </div>
        <div className={style.intrstCont}>
          <button className={style.interestBtn}><img src="./music.png" alt="m" className={style.img} />music</button>
        </div>
        <div className={style.intrstCont}>
          <button className={style.interestBtn}><img src="./music.png" alt="m" className={style.img} />music</button>
        </div>
      </div>
    </div>
  )
}

export default InterestBlock