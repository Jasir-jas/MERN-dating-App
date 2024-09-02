import React, { useEffect, useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import styles from "./ViewedMyProfile.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { VisitProfile } from "../../Services/VisitProfileAPI";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import { sentFriendRequest } from "../../Services/FriendRequestAPI";

const groupContacts = (contacts) => {
    return contacts.reduce((acc, contact) => {
        const firstLetter = contact.viewerId.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
    }, {});
};
const Received = () => {
    const [visitProfiles, setVisitProfiles] = useState({});
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const FetchVisitedProfiles = async () => {
            try {
                const response = await VisitProfile();
                if (response && response.success) {
                    console.log('Visit Profiles:', response.visitedProfiles);
                    const sortedProfiles = response.visitedProfiles.sort((a, b) =>
                        a.viewerId.name.localeCompare(b.viewerId.name)
                    );
                    const groupedContacts = groupContacts(sortedProfiles);
                    setVisitProfiles(groupedContacts);
                } else {
                    console.log('fetching profiles error');
                }
            } catch (error) {
                console.log('fetching profiles error at the API');
            } finally {
                setLoading(false)
            }
        };
        FetchVisitedProfiles();
    }, []);
    if (loading) {
        return <LoadingPage />
    }

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
    return (
        <>
            <Header />
            <div className={styles.app}>
                {error && (
                    <div className={`${styles.messageOverlay} ${styles.errorOverlay}`}>
                        {error}
                    </div>
                )}
                {message && (
                    <div className={`${styles.messageOverlay} ${styles.successOverlay}`}>
                        {message}
                    </div>
                )}
                <div className={styles.contactList}>
                    {Object.keys(visitProfiles).length === 0 ? (
                        <div className={styles.noVisitors}>
                            No visitors to this profile.
                        </div>
                    ) : (
                        Object.keys(visitProfiles).map((letter) => (
                            <div key={letter} className={styles.contactGroup}>
                                <div className={styles.contactGroupLetter}>{letter}</div>
                                {visitProfiles[letter].map((visit, index) => (
                                    <div key={index} className={styles.contactItem}>
                                        <img src={visit.viewerId.profile.profile_image_urls[0]}
                                            alt={visit.viewerId.name} className={styles.contactImg} />
                                        <div className={styles.contactInfo}>
                                            <p className={styles.contactName}>{visit.viewerId.name}</p>
                                            <p className={styles.contactDate}>
                                                {new Date(visit.viewDate).toLocaleDateString()} at {new Date(visit.viewDate).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <div className={styles.contactActions}>
                                            <div className={styles.heartIconContainer}>
                                                <FaHeart className={styles.heartIcon} onClick={() => handleSentFriendRequest(visit.viewerId._id)} />
                                                <div className={styles.hoverText}>Sent Friend Request</div>
                                            </div>
                                            &nbsp;&nbsp;
                                            <FaTimes className={styles.closeIcon} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};
export default Received;

