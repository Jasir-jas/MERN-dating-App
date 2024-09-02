
import React, { useContext } from 'react';
import styles from '../ProfileView/ProfileView.module.css';
import { UserContext } from '../Context/UserContext';
import default_profile from '../../assets/default_profile.jpg'
import { Link } from 'react-router-dom'



const OwnProfileView = () => {
    const { user } = useContext(UserContext)

    return (
        <div
            className={styles.profileViewContainer}
            style={{
                background: `url(${user ? user.profile.profile_image_urls[0] : default_profile}) no-repeat center center`,
                backgroundSize: 'cover'
            }}
        >
            <div className={`${styles.topContainer} ${styles.torchEffect}`}>
                <div className={styles.topLeftArrow}>
                    <Link to='/userhome' style={{ textDecoration: 'none', color: 'white' }}>
                        <i className="fas fa-less-than"></i>
                    </Link>

                </div>

                <div className={styles.topRightLocation}>
                    <Link to='/edit-my-profile'
                        style={{ textDecoration: 'none', color: 'white' }}>
                        <p>Edit</p>
                    </Link>
                </div>

                <div className={styles.userDetails}>
                    <p className={styles.username}>{user ? user.name : 'Guest'},
                        <span>{user ? user.profile.age : null}</span></p>
                    <p className={styles.userPlace}>
                        {user ?
                            (user.profile.location && typeof user.profile.location === 'object' && 'name' in user.profile.location ?
                                user.profile.location.name :
                                user.profile.location) :
                            'Nop'}
                    </p>
                </div>

                <div className={styles.matchingContainer}>
                    <div className={styles.matchingPercentage}>
                        <div className={styles.circle}>
                            <div className={styles.innerCircle}>
                                <p className={styles.percentageNumber}>80</p>
                                <p className={styles.percentageIcon}>%</p>
                            </div>
                        </div>
                    </div>
                    <p className={styles.matchText}>Profile Complete</p>
                </div>
            </div>

            <div className={styles.bottomContainer}>
                <div className={styles.about}>
                    <p className={styles.aboutHeading}>About</p>
                    <p className={styles.aboutContent}>A good listener. I love having a good
                        talk to know each other's side 😍.</p>
                </div>

                <div className={styles.interests}>
                    <p className={styles.interestHeading}>Interest</p>
                    <div className={styles.interestTags}>
                        {user && user.profile.interest.map((interest, index) => (
                            <span key={index} className={styles.interestTag}>
                                🌿 {interest}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnProfileView;


