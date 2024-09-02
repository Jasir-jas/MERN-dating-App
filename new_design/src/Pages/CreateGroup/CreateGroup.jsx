import React from "react";
import styles from "./CreateGroup.module.css";
import { FaArrowLeft, FaBell, FaPlusCircle } from "react-icons/fa";

const CreateGroup = () => {
    const profiles = [
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1682096186855-3f32647abe68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tZW58ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1679865371012-92b8ce5e6d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdvbWVufGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
    ];

    return (
        <div className={styles.groupContainer}>
            <div className={styles.groupContent}>
                <div className={styles.groupHeader}>
                    <h1>BuddyPair</h1>
                    <FaBell className={styles.icon} />
                </div>
                <div className={styles.navigation}>
                    <FaArrowLeft className={styles.icon} />
                    <h2>Create Group</h2>
                </div>
                <div className={styles.content}>
                    <div className={styles.leftColumn}>
                        <h3>Group Title</h3>
                        <h4>Group Description</h4>
                        <h2>Make a Group Call with Friends</h2>
                        <h4>Group Admin</h4>
                        <div className={styles.admin}>
                            <img
                                src="https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG1lbnxlbnwwfHwwfHx8MA%3D%3D"
                                alt="Admin"
                                className={`${styles.profileImg}`}
                            />
                            <div>
                                <p>Rashid Khan</p>
                                <p className={styles.adminRole}>Group Admin</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.rightColumn}>
                        <h4>Invited Members</h4>
                        <div className={styles.memberList}>
                            {profiles.map((member, index) => (
                                <div key={index} className={styles.member}>
                                    <img src={member} alt="Member" className={styles.profileImg} />
                                    <FaPlusCircle className={styles.addIcon} />
                                </div>
                            ))}
                            <div className={styles.addMember}>
                                <FaPlusCircle className={styles.addIcon} />
                            </div>
                        </div>
                        <button className={styles.createButton}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateGroup;
