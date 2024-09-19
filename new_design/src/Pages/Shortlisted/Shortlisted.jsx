import React, { useEffect, useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import styles from "./Shortlisted.module.css"; // Import CSS module
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { getShortListed, removeShortList } from "../../Services/ShortListAPI";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import { getAcceptRequest } from "../../Services/getAcceptRequestAPI";
import { sentFriendRequest } from "../../Services/FriendRequestAPI";

const groupContacts = (contacts) => {
    return contacts.reduce((acc, contact) => {
        const firstLetter = contact.shortListedUserId.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
    }, {});
};

const Shortlisted = () => {
    const [getShortListedProfiles, setGetShortListedProfiles] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const [acceptRequest, setAcceptRequest] = useState({})

    const handleSentFriendRequest = async (receiverId) => {
        console.log('receiverId:', receiverId);
        try {
            const response = await sentFriendRequest(receiverId);
            if (response && response.success) {
                console.log('Friend request sent successfully:', response.message);
                setMessage(response.message);
            } else {
                console.log('Error in sending friend request:', response.error);
                setError(response.error || 'Failed to send friend request');
            }
        } catch (error) {
            console.log('Frontend API call failed:', error);
            setError('Failed to send friend request.');
        }
    };


    const handleRemove = async (profileId) => {
        try {
            const response = await removeShortList(profileId)
            if (response && response.success) {
                console.log(response.message);
                setGetShortListedProfiles((prevData) => {
                    const updatedData = { ...prevData }
                    Object.keys(updatedData).forEach((letter) => {
                        updatedData[letter] = updatedData[letter].filter(
                            (request) => request.shortListedUserId._id !== profileId)

                        if (updatedData[letter].length === 0) {
                            delete updatedData[letter];
                        }
                    })
                    return updatedData
                })
            } else {
                console.log(response.error);
            }
        } catch (error) {
            console.error('Error in  API:', error);
        }
    }

    useEffect(() => {
        const fetchShortListed = async () => {
            try {
                const response = await getShortListed()
                if (response && response.success) {
                    console.log('ShortListProfiles:', response.shortlistedProfiles);
                    const sortedProfiles = response.shortlistedProfiles.sort((a, b) =>
                        a.shortListedUserId.name.localeCompare(b.shortListedUserId.name)
                    );
                    const groupedContacts = groupContacts(sortedProfiles);
                    setGetShortListedProfiles(groupedContacts);

                    Object.values(groupedContacts).forEach((profileGroup) => {
                        profileGroup.forEach(async (profile) => {
                            const friendStatus = await getAcceptRequest(profile.shortListedUserId._id);
                            setAcceptRequest((prev) => ({
                                ...prev,
                                [profile.shortListedUserId._id]: friendStatus.status === 'accepted'
                            }));
                        });
                    });
                } else {
                    console.log('Not Fetching this time');
                }
            } catch (error) {
                console.error('Error in  API:', error);
            } finally {
                setLoading(false)
            }
        }
        fetchShortListed()
    }, [])
    if (loading) {
        return <LoadingPage />
    }


    return (
        <>
            <Header />
            <div className={styles.app}>
                <div className={styles.contactList}>
                    {Object.keys(getShortListedProfiles).map((letter) => (
                        <div key={letter} className={styles.contactGroup}>
                            <div className={styles.contactGroupLetter}>{letter}</div>
                            {getShortListedProfiles[letter].map((shortlist, index) => (
                                <div key={index} className={styles.contactItem}>
                                    <img src={shortlist.shortListedUserId?.profile.profile_image_urls?.[0]}
                                        alt={shortlist.shortlistedProfiles?.name}
                                        className={styles.contactImg} />
                                    <div className={styles.contactInfo}>
                                        <p className={styles.contactName}>{shortlist.shortListedUserId?.name}</p>
                                        <p className={styles.contactDate}>
                                            {new Date(shortlist.createdAt).toLocaleDateString()} at {new Date(shortlist.createdAt).toLocaleTimeString()}
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
                                            {acceptRequest[shortlist.shortListedUserId._id] ? (
                                                <FaHeart className={styles.heartIconFilled} />
                                            ) : (
                                                <FaHeart className={styles.heartIcon}
                                                    onClick={() => handleSentFriendRequest(shortlist.shortListedUserId._id)}
                                                />
                                            )}
                                            {!acceptRequest[shortlist.shortListedUserId._id] && (
                                                <div className={styles.HoverText}>Request</div>
                                            )}
                                        </div>

                                        <div className={styles.HeartIconContainer}>
                                            <FaTimes className={styles.closeIcon}
                                                onClick={() => handleRemove(shortlist.shortListedUserId._id)} />
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

export default Shortlisted;
