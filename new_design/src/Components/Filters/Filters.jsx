import React, { useState } from 'react';
import styles from './filters.module.css';

const Filters = () => {
  const [activeFilter, setActiveFilter] = useState('nearby');

  return (
    <section className={`d-flex justify-content-around ${styles.filters}`}>
      <div
        className={activeFilter === 'nearby' ? styles.filterButtonActive : styles.filterButton}
        onClick={() => setActiveFilter('nearby')}
      >
        Near by
      </div>
      <div
        className={activeFilter === 'education' ? styles.filterButtonActive : styles.filterButton}
        onClick={() => setActiveFilter('education')}
      >
        Education
      </div>
      <div
        className={activeFilter === 'qualification' ? styles.filterButtonActive : styles.filterButton}
        onClick={() => setActiveFilter('qualification')}
      >
        Qualification
      </div>
    </section>
  );
};

export default Filters;
