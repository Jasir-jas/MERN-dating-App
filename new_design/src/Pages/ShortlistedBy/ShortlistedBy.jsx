import React, { useEffect, useState } from "react";
import { FaHeart, FaTimes, FaHeartBroken } from "react-icons/fa";
import styles from "./ShortlistedBy.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { ShortListedBy } from "../../Services/ShortListAPI";
import { getAcceptRequest } from "../../Services/getAcceptRequestAPI";
import { sentFriendRequest } from "../../Services/FriendRequestAPI";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";

const groupContacts = (contacts) => {
    return contacts.reduce((acc, contact) => {
        const firstLetter = contact.userId.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
    }, {});
};

const Received = () => {
    const [getShortListedBy, setGetShortListedBy] = useState([])
    const [acceptedRequest, setAcceptedRequest] = useState({})
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)

    const handleSentFriendRequest = async (receiverId) => {
        console.log('receiverId:', receiverId);
        try {
            const response = await sentFriendRequest(receiverId);
            if (response && response.success) {
                console.log('Friend request sent successfully:', response.message);
                setMessage(response.message);
                // await fetchAcceptUsers();
            } else {
                console.log('Error in sending friend request:', response.error);
                setError(response.error || 'Failed to send friend request');
            }
        } catch (error) {
            console.log('Frontend API call failed:', error);
            setError('Failed to send friend request.');
        }
    };

    useEffect(() => {
        const fetchShortListedBy = async () => {
            try {
                const response = await ShortListedBy()
                if (response && response.success) {
                    console.log('shortListedBy:', response.shortListedBy);
                    const sortedProfiles = response.shortListedBy.sort((a, b) =>
                        a.userId.name.localeCompare(b.userId.name)
                    );
                    const groupedContacts = groupContacts(sortedProfiles);
                    setGetShortListedBy(groupedContacts);

                    Object.values(groupedContacts).forEach((profileGroup) => {
                        profileGroup.forEach(async (profile) => {
                            const friendStatus = await getAcceptRequest(profile.userId._id);
                            setAcceptedRequest((prev) => ({
                                ...prev,
                                [profile.userId._id]: friendStatus.status === 'accepted'
                            }));
                        });
                    });
                }
            } catch (error) {
                console.error('Error in  API:', error);
            } finally {
                setLoading(false)
            }
        }
        fetchShortListedBy()
    }, [])
    if (loading) {
        return <LoadingPage />
    }
    setTimeout(() => {
        setError("");
        setMessage("");
    }, 1500);

    return (
        <>
            <Header />
            <div className={styles.app}>
                <div className={styles.contactList}>
                    {Object.keys(getShortListedBy).map((letter) => (
                        <div key={letter} className={styles.contactGroup}>
                            <div className={styles.contactGroupLetter}>{letter}</div>
                            {getShortListedBy[letter].map((shortlistedBy, index) => (
                                <div key={index} className={styles.contactItem}>
                                    <img src={shortlistedBy.userId?.profile.profile_image_urls?.[0]}
                                        alt={shortlistedBy.userId?.name} className={styles.contactImg}
                                    />
                                    <div className={styles.contactInfo}>
                                        <p className={styles.contactName}>{shortlistedBy.userId?.name}</p>
                                        <p className={styles.contactDate}>
                                            {new Date(shortlistedBy.createdAt).toLocaleDateString()} at {new Date(shortlistedBy.createdAt).toLocaleTimeString()}
                                        </p>
                                    </div>

                                    <div className={styles.contactActions}>

                                        {(error || message) && (
                                            <>
                                                <div className={styles.backgroundDimmer}></div>
                                                <div className={`${styles.messageOverlay} ${error ? styles.errorOverlay : styles.successOverlay}`}>
                                                    {error && <div>{error}</div>}
                                                    {message && <div>{message}</div>}
                                                </div>
                                            </>
                                        )}

                                        <div className={styles.HeartIconContainer}>
                                            {acceptedRequest[shortlistedBy.userId._id] ? (
                                                <FaHeart className={styles.heartIconFilled} />
                                            ) : (
                                                <FaHeart className={styles.heartIcon}
                                                    onClick={() => handleSentFriendRequest(shortlistedBy.userId._id)}
                                                />
                                            )}
                                            {!acceptedRequest[shortlistedBy.userId._id] && (
                                                <div className={styles.HoverText}>Request</div>
                                            )}
                                        </div>
                                        <div className={styles.HeartIconContainer}>
                                            <FaTimes className={styles.closeIcon} />
                                            <div className={styles.HoverText}>Remove</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>);
};

export default Received;
