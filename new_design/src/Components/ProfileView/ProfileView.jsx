import React, { useContext, useEffect, useState } from 'react';
import styles from './ProfileView.module.css';
import default_profile from '../../assets/default_profile.jpg';
import upgradeView from '../UpgradeView/UpgradeView'
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { FetchIndividualProfile } from '../../Services/IndividualProfileGetAPI';
import LoadingPage from '../LoadingPage/LoadingPage';
import { sentFriendRequest } from '../../Services/FriendRequestAPI';
import { getAcceptRequest } from '../../Services/getAcceptRequestAPI';

const ProfileView = () => {
    const { profileId } = useParams()
    const { user } = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(null)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [requestAccepted, setRequestAccepted] = useState(false)

    const fetchAcceptUsers = async () => {
        try {
            const response = await getAcceptRequest(profileId);
            if (response && response.success) {
                if (response.status) {
                    console.log('Friend request status:', response.status);
                    setRequestAccepted(response.status === 'accepted');
                } else if (response.acceptedRequest) {
                    console.log('Accepted requests:', response.acceptedRequest);
                    const currentUserAccepted = response.acceptedRequest.some(
                        (request) => request.senderId._id === profileId
                    );
                    const profileAccepted = response.acceptedRequest.some(
                        (request) => request.receiverId === profileId
                    );
                    console.log('Is current profile accepted:', currentUserAccepted || profileAccepted);
                    setRequestAccepted(currentUserAccepted || profileAccepted);
                }
            } else {
                setError(response.error || 'Failed to fetch accepted requests');
            }
        } catch (error) {
            console.error('Error checking friend request status:', error);
            setError('Failed to check friend request status');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAcceptUsers();
    }, [profileId, user]);

    // For sent Friend Request
    const handleSentFriendRequest = async (receiverId) => {
        console.log('receiverId:', receiverId);
        try {
            const response = await sentFriendRequest(receiverId);
            if (response && response.success) {
                console.log('Friend request sent successfully:', response.message);
                setMessage(response.message);
                await fetchAcceptUsers(); // Recheck status after sending request
            } else {
                console.log('Error in sending friend request:', response.error);
                setError(response.error || 'Failed to send friend request');
            }
        } catch (error) {
            console.log('Frontend API call failed:', error);
            setError('Failed to send friend request.');
        }
        setTimeout(() => {
            setError("");
            setMessage("");
        }, 1500);
    };

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
    if (!loading && !profile) return <div>{<LoadingPage />}</div>;

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
                    <div className={styles.buttonWrapper}>
                        <button className={`${styles.footerButton} ${styles.dislikeButton}`}>X</button>
                        <div className={styles.hoverText}>Dislike</div>
                    </div>

                    <div className={styles.buttonWrapper}>
                        <button className={`${styles.footerButton} ${styles.starButton}`}>★</button>
                        <div className={styles.hoverText}>Shortlist</div>
                    </div>

                    <div className={styles.buttonWrapper}>
                        {!requestAccepted ? (
                            <button
                                type='submit'
                                className={`${styles.footerButton} ${styles.likeButton}`}
                                onClick={() => handleSentFriendRequest(profileId)}
                            >
                                <i className="fas fa-heart"></i>
                                <div className={styles.hoverText}>Send Request</div>
                            </button>
                        ) : (
                            <button className={`${styles.footerButton} ${styles.chatButton}`}>
                                <i className="fas fa-comment"></i>
                                <div className={styles.hoverText}>Message</div>
                            </button>
                        )}
                    </div>


                </div>

            </div>
        </div>
    );
};

export default ProfileView;

