import React from 'react'
import style from "./SpinBtn.module.css"

const SpinBtn = () => {
  return (
    <div className={style.container}>
        <div className={style.btncontainer}>
            <div className={style["curve"]}>
                <div
              style={{
                position:"absolute",
                top: "-18px",
                left: "24%",
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                background: 'conic-gradient(red, yellow, green, cyan, blue, magenta, red)',
              }}></div>
                <div className={style.curveinside}>
                    <div className={style.curv}></div>
                </div>
                <div className={style.curvright}>
                    <div className={style.curvrightinside}></div>
                </div>
            </div>
            <span>Spin here</span>
        </div>
    </div>
  )
}

export default SpinBtn