import React from "react";
import styles from "./Groups.module.css";
import { FaArrowLeft, FaCommentDots, FaPhoneAlt, FaSearch, FaVideo } from "react-icons/fa";

const groups = [
    {
        name: "Team Align",
        members: [
            "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1475669913832-fd187510b578?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVufGVufDB8fDB8fHww",
        ],
    },
    {
        name: "Team SAS",
        members: [
            "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1475669913832-fd187510b578?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVufGVufDB8fDB8fHww",
        ],
    },
    {
        name: "Team Align",
        members: [
            "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1475669913832-fd187510b578?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVufGVufDB8fDB8fHww",
        ],
    },
    {
        name: "Team SAS",
        members: [
            "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1475669913832-fd187510b578?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVufGVufDB8fDB8fHww",
        ],
    },
    {
        name: "Team Align",
        members: [
            "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1475669913832-fd187510b578?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVufGVufDB8fDB8fHww",
        ],
    },
    {
        name: "Team SAS",
        members: [
            "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1475669913832-fd187510b578?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVufGVufDB8fDB8fHww",
        ],
    },
    {
        name: "Team REACT",
        members: [
            "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1475669913832-fd187510b578?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVufGVufDB8fDB8fHww",
        ],
    },
    {
        name: "Team KINGS",
        members: [
            "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1475669913832-fd187510b578?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVufGVufDB8fDB8fHww",
        ],
    },
    {
        name: "Team KINGS",
        members: [
            "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1475669913832-fd187510b578?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVufGVufDB8fDB8fHww",
        ],
    },
    {
        name: "Team KINGS",
        members: [
            "https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1475669913832-fd187510b578?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVufGVufDB8fDB8fHww",
        ],
    },
];

const Groups = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.groupsHeaderContent}>
                <div className={styles.groupsHeader}>
                    <span className={styles.title}>BuddyPair</span>
                    <div className={styles.contactDot}></div>
                </div>
                <div>
                    <FaArrowLeft className={styles.backIcon} />
                </div>
            </div>

            <div className={styles.Container}>
                <div className={styles.listContainer}>
                    <div className={styles.searchBar}>
                        <FaSearch className={styles.searchIcon} />
                        <span>Groups</span>
                        <div></div>
                    </div>
                    {groups.map((group, index) => (
                        <div key={index} className={styles.groupItem}>
                            <GroupProfile images={group.members} />
                            <span className={styles.groupName}>{group.name}</span>
                            <div className={styles.iconContainer}>
                                <FaCommentDots className={styles.icon} />
                                <FaPhoneAlt className={styles.icon} />
                                <FaVideo className={styles.icon} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const GroupProfile = ({ images }) => {
    return (
        <div className={styles.groupProfile}>
            {images.slice(0, 3).map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Member ${index + 1}`}
                    className={`${styles.profileImg} ${styles[`profileImg${index}`]}`}
                />
            ))}
        </div>
    );
};

export default Groups;
