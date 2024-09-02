import React from 'react';
import styles from './PrivacySettings.module.css';

const PrivacySettings = () => {
    return (
        <div className={styles.privacySettingsContainer}>
            <div className={styles.header}>
                <div className={styles.searchIcon}>
                    <i className="fa fa-search" aria-hidden="true"></i>
                </div>
                <h1>Privacy & Settings</h1>
            </div>
            <div className={styles.content}>
                <div className={styles.section}>
                    <div className={styles.item}>
                        <span className={styles.label}>Sign-in Email</span>
                        <span className={styles.value}>johnsmith@gmail.com</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.label}>Password</span>
                        <a href="/" className={styles.changePassword}>Change password</a>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.item}>
                        <span className={styles.label}>2-FA authentication</span>
                        <label className={styles.switch}>
                            <input type="checkbox" />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.label}>Phone number</span>
                        <span className={styles.value}>+380 93 123 45 67</span>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.item}>
                        <span className={styles.label}>Partner Preference</span>
                        <span className={styles.value}></span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.label}>Last sign in</span>
                        <span className={styles.value}>today at 18:34, Safari 198.123.23.23</span>
                    </div>
                </div>

                <div className={styles.section}>
                    <div className={styles.item}>
                        <span className={styles.label}>Total active sessions (5)</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.value}>DESKTOP-6TIG6EC • Kyiv, Ukraine<br />Chrome • Used right now</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.value}>Iphone 11 • Kyiv, Ukraine<br />Chrome • 04/19/2022</span>
                    </div>
                </div>
                <div className={styles.section}>
                    <button className={styles.resetButton}>
                        <i className="fa fa-plus" aria-hidden="true"></i>Reset all active sessions
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PrivacySettings;
