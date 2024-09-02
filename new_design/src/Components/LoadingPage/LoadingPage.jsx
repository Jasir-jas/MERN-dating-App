import React, { useState } from 'react'
import styles from './LoadingPage.module.css'
import { BeatLoader } from 'react-spinners'

const LoadingPage = () => {
    return (
        <div className={styles.container}>
            <BeatLoader color='#7F00FF' />
        </div>
    )
}
export default LoadingPage
