import React, { useEffect, useState } from "react";
import styles from "./Accept.module.css";
import { FaPhone, FaVideo } from "react-icons/fa";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { getAcceptRequest } from "../../Services/getAcceptRequestAPI";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";

const Accepted = () => {
    const [getAccept, setGetAccept] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAcceptRequest = async () => {
            try {
                const response = await getAcceptRequest()
                if (response && response.success) {
                    console.log('Accepted Request:', response.acceptedRequests);
                    setGetAccept(response.acceptedRequests)
                } else {
                    console.log("fetching profiles error");
                }
            } catch (error) {
                console.log("Frontend api not responded");
            } finally {
                setLoading(false)
            }
        }
        fetchAcceptRequest()
    }, [])
    if (loading) {
        return <LoadingPage />
    }
    return (
        <>
            <Header />
            <div className={styles.app}>
                <div className={styles.contactList}>
                    {getAccept.length === 0 ? (
                        <div className={styles.noVisitors}>
                            No accepted profiles at this time.
                        </div>
                    ) : (
                        <div className={styles.contactListContent}>
                            {getAccept.map((accept, index) => (
                                <div key={index} className={styles.contactItem}>
                                    <img src={accept.senderId?.profile.profile_image_urls?.[0]} alt={accept.senderId?.name} className={styles.contactImg} />
                                    <div className={styles.contactInfo}>
                                        <p className={styles.contactName}>{accept.senderId?.name}</p>
                                        <p className={styles.contactDate}>
                                            {new Date(accept.updatedAt).toLocaleDateString()} at {new Date(accept.updatedAt).toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <div className={styles.contactActions}>
                                        <FaPhone className={styles.callIcon} />
                                        <FaVideo className={styles.videoIcon} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
            <Footer />
        </>);
};

export default Accepted;
