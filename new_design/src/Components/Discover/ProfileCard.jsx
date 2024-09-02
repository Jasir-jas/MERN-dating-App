import React from 'react';
// import { Image } from 'react-bootstrap';
import styles from './ProfileCard.module.css';

const ProfileCard = ({ tag, imageUrl, distance, name, age, location }) => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.matchBadge}>{tag}</div>
      <div className={styles.imageContainer}>
        <img src={imageUrl} className={styles.profileImage} />
      </div>
      <div className={styles.profileOverlay}>
        <div className={styles.profileDistance}>{distance} away</div>
        <div className={styles.profileName}>
          {name}, {age} <span className={styles.onlineStatus}></span>
        </div>
        <div className={styles.profileLocation}>{location}</div>
      </div>
    </div>
  );
};

export default ProfileCard;