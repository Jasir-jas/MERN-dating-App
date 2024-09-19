import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import styles from "./Messages.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import { fetchAcceptedRequests } from "../../Services/ParentMessageAPI";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";

const Messages = () => {
    const [accepetedequets, setAcceptedRequests] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetchAcceptedRequests()
                if (response && response.success) {
                    setAcceptedRequests(response.friends)
                    console.log('Friends:', response.friends)
                }
            } catch (error) {
                console.log('Service not responded', error);
            } finally {
                setLoading(false)
            }
        }
        fetchFriends()
    }, [])
    if (loading) {
        return <LoadingPage />
    }
    return (
        <>
            <Header />
            <div>
                <div className={styles.recentMatches}>
                    <h2>Recent Matches</h2>
                    <div className={styles.recentMatchesList}>
                        {accepetedequets.slice(0, 6).map((friends, index) => (
                            <div key={index} className={styles.recentMatchItem}>
                                <Link to={`/personal-messages/${friends.friends._id}`}>
                                    <div className={styles.contactImgContainer}>
                                        <img src={friends.friends?.profile.profile_image_urls?.[0]}
                                            alt={friends.friends?.name} className={styles.recentMatchImg} />
                                        <div className={styles.overlayContainer}>
                                            <div className={styles.heartIcon}>
                                                <FaHeart />
                                            </div>
                                            <div className={styles.likeCount}>0</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.app}>
                    <div className={styles.contactList}>
                        {accepetedequets.map((friends, index) => (
                            <Link to={`/personal-messages/${friends.friends._id}`} style={{
                                textDecoration: 'none',
                                color: 'black'
                            }}>

                                <div key={index} className={styles.contactItem}>
                                    <img src={friends.friends?.profile.profile_image_urls?.[0]}
                                        alt={friends.friends?.name} className={styles.contactImg} />
                                    <div className={styles.contactInfo}>
                                        <p className={styles.contactName}>{friends.friends?.name}</p>
                                        <p className={styles.contactMessage}>Last message preview...</p>
                                    </div>
                                    <div className={styles.contactRightSide}>
                                        <div className={styles.contactDot}></div>
                                        <div className={styles.contactTime}>09:30</div>
                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>);
};

export default Messages;
