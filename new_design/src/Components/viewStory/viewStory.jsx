// import React from 'react'
// import './viewStory.css'
// import ladyImage from '../../assets/ladyImage1.jpg'

// //  use this if not upgraded
// import UpgradeView from '../UpgradeView/UpgradeView'



// const viewStory = () => {
//     return (
//         <div className='chatview-container'>
//             <img src={ladyImage} alt="Background" />
//             <i class="fas fa-arrow-left back-arrow"></i>

//             <div className="profile-info">
//                 <div className="storyProfile-image">
//                     <img src={ladyImage} alt="Profile" />
//                 </div>
//                 <p className="online-dot"></p>

//                 <div className='profile-name-status'>
//                     <div className="profile-name">Stone Stellar</div>
//                     <div className="profile-status">Online</div>
//                 </div>
//             </div>



//             <div className="volume-slider-bg"></div>
//             <div className="volume-slider">
//                 <input type="range" min="0" max="100" id='volumeRange' />
//                 <div className="sound-icon">🔊</div>
//             </div>
//             <div className="hashtag"># Tea Time</div>

//             <div className="action-buttons">
//                 <div className='new-button'>
//                     NEW
//                     <p className="action-button-message">💬</p>
//                 </div>
//                 <div className="action-button-close">
//                     <i class="fas fa-times"></i>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default viewStory

import React from 'react';
import styles from './viewStory.module.css';
import ladyImage from '../../assets/ladyImage1.jpg';

const ViewStory = () => {
    return (
        <div className={styles.chatviewContainer}>
            <img src={ladyImage} alt="Background" />
            <i className={`fas fa-arrow-left ${styles.backArrow}`}></i>

            <div className={styles.profileInfo}>
                <div className={styles.storyProfileImage}>
                    <img src={ladyImage} alt="Profile" />
                </div>
                <p className={styles.onlineDot}></p>

                <div className={styles.profileNameStatus}>
                    <div className={styles.profileName}>Stone Stellar</div>
                    <div className={styles.profileStatus}>Online</div>
                </div>
            </div>

            {/* <div className={styles.volumeSliderBg}></div>
            <div className={styles.volumeSlider}>
                <input type="range" min="0" max="100" id='volumeRange' />
                <div className={styles.soundIcon}>🔊</div>
            </div> */}
            <div className={styles.volumeControlContainer}>
                <div className={styles.volumeSliderBg}>
                    <input type="range" min="0" max="100" id='volumeRange' className={styles.volumeSlider} />
                    <div className={styles.soundIcon}>🔊</div>
                </div>
            </div>

            <div className={styles.hashtag}># Tea Time</div>

            <div className={styles.actionButtons}>
                <div className={styles.newButton}>
                    NEW
                    <p className={styles.actionButtonMessage}>💬</p>
                </div>
                <div className={styles.actionButtonClose}>
                    <i className="fas fa-times"></i>
                </div>
            </div>
        </div>
    );
}

export default ViewStory;

