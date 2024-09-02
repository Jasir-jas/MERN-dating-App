import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import styles from './likeAndConnect.module.css';

const LikeAndConnect = () => {
  return (
    <div className={`d-flex ${styles.likeAndConnect}`}>
      <div className={styles.iconContainer}>
        <div className={styles.iconWrapper}>
          <div className={styles.iconCircle}>
            <div className={styles.iconBackground}></div>
            <FontAwesomeIcon icon={faHeart} className={styles.icon} />
          </div>
        </div>
        <p className={styles.iconText}>
          Likes <span className={styles.iconCount}>32</span>
        </p>
      </div>
      <div className={styles.iconContainer}>
        <div className={styles.iconWrapper}>
          <div className={styles.iconCircle}>
            <div className={styles.iconBackground}></div>
            <FontAwesomeIcon icon={faComment} className={styles.icon} />
          </div>
        </div>
        <p className={styles.iconText}>
          Connect <span className={styles.iconCount}>15</span>
        </p>
      </div>
    </div>
  );
};

export default LikeAndConnect;
