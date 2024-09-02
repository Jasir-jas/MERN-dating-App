import React, { useContext, useEffect, useState } from 'react';
import styles from './ProfileView.module.css';
import default_profile from '../../assets/default_profile.jpg';
import upgradeView from '../UpgradeView/UpgradeView'
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { FetchIndividualProfile } from '../../Services/IndividualProfileGetAPI';
import LoadingPage from '../LoadingPage/LoadingPage';
import { sentFriendRequest } from '../../Services/FriendRequestAPI';

const ProfileView = () => {
    const { profileId } = useParams()
    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')


    // For sent Friend Request
    const handleSentFriendRequest = async (receiverId) => {
        console.log('receiverId:', receiverId);
        try {
            const response = await sentFriendRequest(receiverId)
            if (response && response.success) {
                console.log(response.message);
                setMessage(response.message)
            } else {
                console.log(response.error);
                setError(response.error)
            }
        } catch (error) {
            console.log('FrontEnd api no response');
            setError('Failed to send friend request.');
        }
        setTimeout(() => {
            setError("");
            setMessage("");
        }, 1500);
    }

    const [profile, setProfile] = useState(null)
    useEffect(() => {
        if (user === null || user === undefined) {
            return;
        }
        const fetchUserProfile = async () => {
            if (!user || !user._id) {
                setError('user not authenticated')
                setLoading(false)
                return
            }
            try {
                const response = await FetchIndividualProfile(profileId, user._id)
                if (response.success) {
                    setProfile(response.profile)
                    console.log('Individual profile:', response.profile);
                } else {
                    console.log('Fetching user profile error');
                    setError("Failed to fetch profile");
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError("An error occurred while fetching the profile");
            } finally {
                setLoading(false);
            }
        }
        fetchUserProfile()
    }, [profileId, user])

    if (user === null || user === undefined) {
        return <LoadingPage />;
    }
    if (loading) return <div>{<LoadingPage />}</div>;
    if (!loading && !profile) return <div>No profile data available</div>;

    return (
        <div
            className={styles.profileViewContainer}
            style={{
                background: `url(${profile ? profile.profile.profile_image_urls[0] : default_profile} ) no-repeat center center`,
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
                    <i className="fa-solid fa-location-arrow"></i>
                    <p>2.5 km</p>
                </div>

                <div className={styles.userDetails}>
                    <p className={styles.username}>{profile ? profile.name : 'Guest'},
                        <span>{profile ? profile.profile.age : 'Nop'}</span></p>
                    <p className={styles.userPlace}>
                        {profile ? profile.profile.location.name : 'Nop'}
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
                    <p className={styles.matchText}>Match</p>
                </div>
            </div>

            <div className={styles.bottomContainer}>
                {(error || message) && (
                    <>
                        <div className={styles.backgroundDimmer}></div>
                        <div className={`${styles.messageOverlay} ${error ? styles.errorOverlay : styles.successOverlay}`}>
                            {error && <div>{error}</div>}
                            {message && <div>{message}</div>}
                        </div>
                    </>
                )}

                <div className={styles.about}>
                    <p className={styles.aboutHeading}>About</p>
                    <p className={styles.aboutContent}>
                        {profile && profile.profile && profile.profile.bio ? profile.profile.bio
                            : 'No bio Available this Profile'} 😍.
                    </p>
                </div>

                <div className={styles.interests}>
                    <p className={styles.interestHeading}>Interests</p>
                    <div className={styles.interestTags}>
                        {profile.profile.interest && profile.profile.interest.length > 0 ? (
                            profile.profile.interest.map((interest, index) => (
                                <span key={index} className={styles.interestTag}>🌿{interest}</span>
                            ))
                        ) : (
                            <span>No interests listed</span>
                        )}
                    </div>
                </div>

                <div className={styles.footerContainer}>
                    <button className={`${styles.footerButton} ${styles.dislikeButton}`}>X</button>
                    <button className={`${styles.footerButton} ${styles.starButton}`}>★</button>

                    <button type='submit' className={`${styles.footerButton} ${styles.likeButton}`}
                        onClick={() => handleSentFriendRequest(profileId)}>
                        <div className={styles.heartHoverText}>Sent Request</div>
                        <i className="fas fa-heart"></i>
                    </button>

                    <button className={`${styles.footerButton} ${styles.chatButton}`}>💬</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileView;

