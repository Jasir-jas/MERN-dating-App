import React, { useEffect, useState } from "react";
import styles from "./Sent.module.css";
import { FaTimes } from "react-icons/fa";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { getFriendRequest, removeSentRequest } from "../../Services/FriendRequestAPI";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";

const groupContacts = (contacts) => {
    return contacts.reduce((acc, contact) => {
        const firstLetter = contact.receiverId.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
    }, {});
};

const Sent = () => {
    const [getSentRequest, setGetFriendRequest] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSentRequest = async () => {
            try {
                const response = await getFriendRequest();
                if (response && response.success) {
                    console.log('Sent Requests:', response.sentRequests);
                    const sortedProfiles = response.sentRequests.sort((a, b) =>
                        a.receiverId.name.localeCompare(b.receiverId.name)
                    );
                    const groupedContacts = groupContacts(sortedProfiles);
                    setGetFriendRequest(groupedContacts);
                } else {
                    console.log("fetching profiles error");
                }
            } catch (error) {
                console.log("Frontend api not responded");
            } finally {
                setLoading(false)
            }
        };
        fetchSentRequest();
    }, []);

    const handleRemoveRequest = async (receiverId) => {
        console.log('removed id:', receiverId);
        try {
            const response = await removeSentRequest(receiverId)
            if (response.success) {
                console.log(response.message);

                setGetFriendRequest((prevRequests) => {
                    const updatedRequests = { ...prevRequests };
                    Object.keys(updatedRequests).forEach((letter) => {
                        updatedRequests[letter] = updatedRequests[letter].filter(
                            (request) => request.receiverId !== receiverId
                        );
                        // Remove the letter group if it's empty
                        if (updatedRequests[letter].length === 0) {
                            delete updatedRequests[letter];
                        }
                    });
                    return updatedRequests;
                });
            }
        } catch (error) {
            console.log("Frontend api not responded");
        }
    }

    if (loading) {
        return <LoadingPage />
    }

    return (
        <>
            <Header />
            <div className={styles.app}>
                <div className={styles.contactList}>
                    {Object.keys(getSentRequest).length === 0 ? (
                        <div className={styles.noVisitors}>
                            No sent request to this profile.
                        </div>
                    ) : (
                        <div className={styles.contactListContent}>
                            {Object.keys(getSentRequest).map((letter) => (
                                <div key={letter} className={styles.contactGroup}>
                                    <div className={styles.contactGroupLetter}>{letter}</div>
                                    {getSentRequest[letter].map((sentRequests, index) => (
                                        <div key={index} className={styles.contactItem}>
                                            <img
                                                src={sentRequests.receiverId?.profile?.profile_image_urls?.[0]}
                                                alt={sentRequests.receiverId?.name}
                                                className={styles.contactImg}
                                            />
                                            <div className={styles.contactInfo}>
                                                <p className={styles.contactName}>
                                                    {sentRequests.receiverId?.name}
                                                </p>
                                                <p className={styles.contactDate}>
                                                    {new Date(sentRequests.updatedAt).toLocaleDateString()} at {new Date(sentRequests.updatedAt).toLocaleTimeString()}
                                                </p>
                                            </div>
                                            <div className={styles.contactActions}>
                                                <FaTimes className={styles.closeIcon}
                                                    onClick={() => handleRemoveRequest(sentRequests.receiverId)} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </>
    );
};

export default Sent;

