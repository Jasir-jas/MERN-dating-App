import React, { useEffect, useState } from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import styles from "./Received.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import { AcceptRequest, getReceivedRequest } from "../../Services/ReceivedRequestAPI";

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

    useEffect(() => {
        const fetchReceievedRequest = async () => {
            try {
                const response = await getReceivedRequest()
                if (response && response.success) {
                    console.log('ReceivedRequests:', response.receiveRequests);
                    const sortedProfiles = response.receiveRequests.sort((a, b) =>
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
                setLoading(false)
            }
        }
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
                                                alt={receive.senderId.name} className={styles.contactImg} />

                                            <div className={styles.contactInfo}>
                                                <p className={styles.contactName}>{receive.senderId?.name}</p>
                                                <p className={styles.contactDate}>
                                                    {new Date(receive.updatedAt).toLocaleDateString()} at {new Date(receive.updatedAt).toLocaleTimeString()}
                                                </p>
                                            </div>
                                            <div className={styles.contactActions}>
                                                <FaHeart className={styles.heartIcon}
                                                    onClick={() => handleAcceptRequest(receive.senderId)} />&nbsp;&nbsp;
                                                <FaTimes className={styles.closeIcon} />
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
