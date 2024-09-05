import React, { useEffect, useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import styles from "./Received.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import { AcceptRequest, RejectRequest, getReceivedRequest } from "../../Services/ReceivedRequestAPI";

const groupContacts = (contacts) => {
    return contacts.reduce((acc, contact) => {
        const firstLetter = contact.senderId.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
    }, {});
};

const Received = () => {
    const [getReceiveRequest, setGetReceiveRequest] = useState({})
    const [loading, setLoading] = useState(true)

    const handleAcceptRequest = async (senderId) => {
        try {
            const response = await AcceptRequest(senderId)
            console.log('AcceptId:', senderId);
            if (response && response.success) {
                console.log('Accepted request');
                setGetReceiveRequest((prevRequests) => {
                    const updatedRequest = { ...prevRequests }
                    for (let letter in updatedRequest) {
                        updatedRequest[letter] = updatedRequest[letter]
                            .filter((request) => request.senderId !== senderId)
                        if (updatedRequest[letter].length === 0) {
                            delete updatedRequest[letter]
                        }
                    }
                    return updatedRequest
                })
            } else {
                console.log('Requested Accepted Error');
            }
        } catch (error) {
            console.log("Frontend api not responded");
        }
    }

    const handleRejectRequest = async (senderId) => {
        try {
            const response = await RejectRequest(senderId)
            console.log('RejectId:', senderId);
            if (response && response.success) {
                console.log('Reject request');

                setGetReceiveRequest((prevRequests) => {
                    const updatedRequests = { ...prevRequests };
                    Object.keys(updatedRequests).forEach((letter) => {
                        updatedRequests[letter] = updatedRequests[letter].filter(
                            (request) => request.senderId !== senderId
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

    useEffect(() => {
        const fetchReceievedRequest = async () => {
            try {
                const response = await getReceivedRequest();
                if (response && response.success) {
                    const pendingRequests = response.receiveRequests.filter(
                        (request) => request.status === 'pending'
                    );
                    const sortedProfiles = pendingRequests.sort((a, b) =>
                        a.senderId.name.localeCompare(b.senderId.name)
                    );
                    const groupedContacts = groupContacts(sortedProfiles);
                    setGetReceiveRequest(groupedContacts);
                } else {
                    console.log("fetching profiles error");
                }
            } catch (error) {
                console.log("Frontend api not responded");
            } finally {
                setLoading(false);
            }
        };
        fetchReceievedRequest()
    }, [])

    if (loading) {
        return <LoadingPage />
    }
    return (
        <>
            <Header />
            <div className={styles.app}>
                <div className={styles.contactList}>
                    {Object.keys(getReceiveRequest).length === 0 ? (
                        <div className={styles.noVisitors}>
                            No received request ath this time.
                        </div>
                    ) : (
                        <div className={styles.contactListContent}>
                            {Object.keys(getReceiveRequest).map((letter) => (
                                <div key={letter} className={styles.contactGroup}>
                                    <div className={styles.contactGroupLetter}>{letter}</div>
                                    {getReceiveRequest[letter].map((receive, index) => (
                                        <div key={index} className={styles.contactItem}>
                                            <img src={receive.senderId?.profile?.profile_image_urls?.[0]}
                                                alt={receive.senderId.name}
                                                className={styles.contactImg} />

                                            <div className={styles.contactInfo}>
                                                <p className={styles.contactName}>
                                                    {receive.senderId?.name}
                                                </p>
                                                <p className={styles.contactDate}>
                                                    {new Date(receive.updatedAt).toLocaleDateString()} at {new Date(receive.updatedAt).toLocaleTimeString()}
                                                </p>
                                            </div>

                                            <div className={styles.contactActions}>
                                                <div className={styles.iconContainer}>
                                                    <FaHeart
                                                        className={styles.heartIcon}
                                                        onClick={() => handleAcceptRequest(receive.senderId)}
                                                    />
                                                    <div className={styles.tooltipText}>Accept</div>
                                                </div>
                                                &nbsp;&nbsp;
                                                <div className={styles.iconContainer}>
                                                    <FaTimes
                                                        className={styles.closeIcon}
                                                        onClick={() => handleRejectRequest(receive.senderId)}
                                                    />
                                                    <div className={styles.tooltipText}>Reject</div>
                                                </div>
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
        </>);
};

export default Received;
