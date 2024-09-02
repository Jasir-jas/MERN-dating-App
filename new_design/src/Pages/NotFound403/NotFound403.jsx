import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './notFound403.module.css';

const NotFound403 = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        <h1 className={styles.notFoundErrorCode}>403</h1>
        <p className={styles.notFoundMessage}>Access Denied</p>
        <p className={styles.notFoundDescription}>Sorry, you don't have access to this page</p>
        <button className={styles.notFoundButton}>
          Go back to the Previous page <FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default NotFound403;
