import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './notFound404.module.css';

const NotFound404 = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        <h1 className={styles.notFoundErrorCode}>404</h1>
        <p className={styles.notFoundMessage}>Ooops...</p>
        <p className={styles.notFoundDescription}>We cannot find this page</p>
        <button className={styles.notFoundButton}>
          Let&apos;s try something different <FontAwesomeIcon icon={faChevronRight} className={styles.icon} />
        </button>
      </div>
    </div>
  );
};

export default NotFound404;
