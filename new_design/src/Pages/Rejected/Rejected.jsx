import React, { useEffect, useState } from "react";
import styles from "./Rejected.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { getRejectRequest } from "../../Services/GetRejectedRequestAPI";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";

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

const Rejected = () => {
    const [getRejected, setGetRejected] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRejectedRequest = async () => {
            try {
                const response = await getRejectRequest()
                if (response && response.success) {
                    console.log('ReceivedRequests:', response.rejectedRequest);
                    const sortedProfiles = response.rejectedRequest.sort((a, b) =>
                        a.senderId.name.localeCompare(b.senderId.name)
                    );
                    const groupedContacts = groupContacts(sortedProfiles);
                    setGetRejected(groupedContacts);
                } else {
                    console.log("fetching profiles error");
                }
            } catch (error) {
                console.log("Frontend api not responded");
            } finally {
                setLoading(false)
            }
        }
        fetchRejectedRequest()
    }, [])
    if (loading) {
        return <LoadingPage />
    }
    return (
        <>
            <Header />
            <div className={styles.app}>
                <div className={styles.contactList}>
                    {Object.keys(getRejected).length === 0 ? (
                        <div className={styles.noVisitors}>
                            No reject profiles at this time.
                        </div>
                    ) : (
                        <div className={styles.contactListContent}>
                            {Object.keys(getRejected).map((letter) => (
                                <div key={letter} className={styles.contactGroup}>
                                    <div className={styles.contactGroupLetter}>{letter}</div>
                                    {getRejected[letter].map((reject, index) => (
                                        <div key={index} className={styles.contactItem}>
                                            <img src={reject.senderId?.profile.profile_image_urls?.[0]} alt={reject.senderId?.name} className={styles.contactImg} />
                                            <div className={styles.contactInfo}>
                                                <p className={styles.contactName}>{reject.senderId?.name}</p>
                                                <p className={styles.contactDate}>
                                                    {new Date(reject.updatedAt).toLocaleDateString()} at {new Date(reject.updatedAt).toLocaleTimeString()}
                                                </p>
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

export default Rejected;
