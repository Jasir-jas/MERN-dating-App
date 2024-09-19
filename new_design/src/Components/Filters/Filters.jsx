import React, { useState } from 'react';
import styles from './filters.module.css';
import { Link } from 'react-router-dom';

const Filters = () => {
  const [activeFilter, setActiveFilter] = useState('nearby');

  return (
    <section className={`d-flex justify-content-around ${styles.filters}`}>
      <div
        className={activeFilter === 'nearby' ? styles.filterButtonActive : styles.filterButton}
        onClick={() => setActiveFilter('nearby')}
      >
        <Link to='/near-by-user' style={{ textDecoration: 'none', color: '#000' }}>
          Near by
        </Link>
      </div>
      <div
        className={activeFilter === 'designation' ? styles.filterButtonActive : styles.filterButton}
        onClick={() => setActiveFilter('designation')}
      >
        <Link to='/designation' style={{ textDecoration: 'none', color: '#000' }}>
          Designation
        </Link>

      </div>
      <div
        className={activeFilter === 'qualification' ? styles.filterButtonActive : styles.filterButton}
        onClick={() => setActiveFilter('qualification')}
      >
        <Link to='/qualification' style={{ textDecoration: 'none', color: '#000' }}>
          Qualification
        </Link>

      </div>
    </section>
  );
};

export default Filters;
