import React from 'react';
import styles from './UpgradeView.module.css';

const UpgradeView = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <p>Upgrade to view Profile</p>
                <button className={styles.upgradeBtn}>Upgrade</button>
            </div>
        </div>
    );
}

export default UpgradeView;
