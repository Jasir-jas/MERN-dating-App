import React from 'react';
import { Image } from 'react-bootstrap';
import styles from './profileCard.module.css';

const ProfileCard = ({ matchPercentage, imageUrl, distance, name, age, location }) => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.matchBadge}>{matchPercentage} Match</div>
      <div className={styles.imageContainer}>
        <Image src={imageUrl} className={styles.profileImage} />
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
