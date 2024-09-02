import React from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import styles from "./Contacted.module.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const contacts = [
    {
        name: "Team Align",
        date: "Today, 09:30 AM",
        imgSrc: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Binoj varghes",
        date: "Today, 09:30 AM",
        imgSrc: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Jhon Abraham",
        date: "03/07/22, 07:30 AM",
        imgSrc: "https://plus.unsplash.com/premium_photo-1679865371012-92b8ce5e6d12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdvbWVufGVufDB8fDB8fHww",
    },
    {
        name: "Jhon Abraham",
        date: "Today, 07:30 AM",
        imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        name: "Alex Linderson",
        date: "Monday, 09:30 AM",
        imgSrc: "https://plus.unsplash.com/premium_photo-1682096186855-3f32647abe68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tZW58ZW58MHx8MHx8fDA%3D",
    },
    {
        name: "Sabila Sayma",
        date: "Yesterday, 07:35 PM",
        imgSrc: "https://plus.unsplash.com/premium_photo-1677553954020-68ac75b4e1b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG1lbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        name: "John Borino",
        date: "Monday, 09:30 AM",
        imgSrc: "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybHxlbnwwfHwwfHx8MA%3D%3D",
    },
];

const groupContacts = (contacts) => {
    const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
    return sortedContacts.reduce((acc, contact) => {
        const firstLetter = contact.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(contact);
        return acc;
    }, {});
};

const Contacted = () => {
    const groupedContacts = groupContacts(contacts);

    return (
        <>
        <Header />
        <div className={styles.app}>
            <div className={styles.contactList}>
                {Object.keys(groupedContacts).map((letter) => (
                    <div key={letter} className={styles.contactGroup}>
                        <div className={styles.contactGroupLetter}>{letter}</div>
                        {groupedContacts[letter].map((contact, index) => (
                            <div key={index} className={styles.contactItem}>
                                <img src={contact.imgSrc} alt={contact.name} className={styles.contactImg} />
                                <div className={styles.contactInfo}>
                                    <p className={styles.contactName}>{contact.name}</p>
                                    <p className={styles.contactDate}>{contact.date}</p>
                                </div>
                                <div className={styles.contactActions}>
                                    <FaHeart className={styles.heartIcon} />&nbsp;&nbsp;
                                    <FaTimes className={styles.closeIcon} />
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
        <Footer />
</>    );
};

export default Contacted;
