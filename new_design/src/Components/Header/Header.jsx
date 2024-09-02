import React, { useContext } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { MdArrowBackIos } from "react-icons/md";
import styles from "./Header.module.css";
import { ModalContext } from "../../StateManagement/ModalContext";

const Header = () => {
    const  {pageName,toggleModal}=useContext(ModalContext)
    return (
        <header className={styles.headerContainer}>
            <div className={styles.container}>
                {pageName !== "Message" && (
                    <div className={styles.menuIcon}>
                        <FaSearch className={styles.humburgeIcon} onClick={toggleModal} />
                    </div>
                )}
                <div className={styles.headerName}>
                    <h2>
                        {pageName === "Message" && <MdArrowBackIos className={styles.icon} />}
                        <>{pageName}</>
                        
                    </h2>
                </div>
                {pageName !== "Message" && (
                    <div className={styles.menuIcon}>
                        <FaBars className={styles.humburgeIcon} onClick={toggleModal} />
                    </div> 
                )}
            </div>
        </header>
    );
};

export default Header;
