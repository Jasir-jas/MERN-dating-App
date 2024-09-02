import React, { useContext } from "react";
import { FaSignOutAlt, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./RightSideModal.module.css"; // Correctly import the CSS module
import { ModalContext } from "../../StateManagement/ModalContext";
import { UserContext } from "../Context/UserContext";
import default_profile from '../../assets/default_profile.jpg'

const RightSideModal = () => {
    const { user, logout } = useContext(UserContext)
    const { isModalOpen, toggleModal, handlePageNameChange } = useContext(ModalContext)
    const handleLinkClick = (name) => {
        handlePageNameChange(name);
        toggleModal()
    };
    const handleLogout = () => {
        logout();      // Perform logout
        toggleModal(); // Close the modal after logging out
    };
    console.log("This is me :", user);

    const profileImageUrl = user && user.profile && user.profile.profile_image_urls ?
        user.profile.profile_image_urls[0] : default_profile

    return (
        <>
            {isModalOpen && <div className={styles.overlay} onClick={toggleModal}></div>}
            <div className={`${styles["right-side-modal"]} ${isModalOpen ? styles.open : ""}`}>
                <div className={styles["modal-content"]}>
                    <div className={styles["modal-header"]}>
                        <div className={styles["profile-section"]}>
                            <div className={styles["profile-image-container"]}>
                                <img
                                    src={profileImageUrl}
                                    alt="Profile"
                                    className={styles["profile-pic"]}
                                />
                                <span className={styles["online-status"]}></span>
                            </div>
                            <div className={styles["profile-info"]}>
                                <h3>{user ? user.name : 'Guest'}</h3>
                                <h4>Prime Member</h4>
                                <p>Online</p>
                            </div>
                        </div>
                        <FaTimes className={styles["close-icon"]} onClick={toggleModal} />
                    </div>
                    <div className={styles["modal-body"]}>
                        <ul>
                            <Link to={'/ownProfileview'}>
                                <li onClick={() => handleLinkClick('My Profile')}>My Profile</li>
                            </Link>
                            <Link to={"/sent"}>
                                <li onClick={() => handleLinkClick("Sent ")}>Sent Request</li>
                            </Link>
                            <Link to={"/viewed-my-profile"}>
                                <li onClick={() => handleLinkClick("Viewed My Profile")}>Viewed My Profile</li>
                            </Link>
                            <Link to={"/accepted"}>
                                <li onClick={() => handleLinkClick("Accept")}>Accept Request</li>
                            </Link>
                            <Link to={"/rejected"}>
                                <li onClick={() => handleLinkClick("Reject")}>Reject</li>
                            </Link>
                            <Link to={"/received"}>
                                <li onClick={() => handleLinkClick("Received")}>Received</li>
                            </Link>
                            <Link to={"/shortlistedBy"}>
                                <li onClick={() => handleLinkClick("Shortlisted By")}>Shortlisted By</li>
                            </Link>
                            <Link to={"/shortlisted"}>
                                <li onClick={() => handleLinkClick("Shortlisted")}>Shortlisted</li>
                            </Link>
                            {/* <Link to={"/contacted"}>
                                <li onClick={() => handleLinkClick("Contacted")}>Contacted</li>
                            </Link> */}
                            <Link to={"/messages"}>
                                <li onClick={() => handleLinkClick("Message")}>Message</li>
                            </Link>
                            <Link to={"/settings"}>
                                <li onClick={() => handleLinkClick("Settings")}>Settings</li>
                            </Link>
                        </ul>
                    </div>
                    <div className={styles["modal-footer"]}>
                        <button className={styles["logout-button"]} onClick={handleLogout}><FaSignOutAlt />&nbsp; Logout</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RightSideModal;
