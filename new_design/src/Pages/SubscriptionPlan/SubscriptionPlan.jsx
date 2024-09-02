import React from 'react';
import Footer from '../../Components/Footer/Footer';
import styles from './subscriptionPlan.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const SubscriptionPlan = () => {
  return (
    <div className={styles.subscriptionContainer}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Subscription Plan</h1>
      </header>
      <div className={styles.subscriptionContent}>
        <div className={styles.planCard}>
          <h2 className={styles.planTitle}>Prime Member</h2>
          <p className={styles.planPrice}>₹49/-month</p>
          <ul className={styles.planFeatures}>
            <li className={styles.planFeatureItem}>
              <div className={styles.featureHeader}>
                <FontAwesomeIcon icon={faCheckCircle} className={styles.tickIcon} />
                <strong>Daily Limits</strong>
              </div>
              <div className={styles.featureContent}>
                <p>View up to 15 profiles per day</p>
                <p>Send up to 15 requests per day</p>
              </div>
              <hr className={styles.separator} />
            </li>
            <li className={styles.planFeatureItem}>
              <div className={styles.featureHeader}>
                <FontAwesomeIcon icon={faCheckCircle} className={styles.tickIcon} />
                <strong>Weekly Limits</strong>
              </div>
              <div className={styles.featureContent}>
                <p>View up to 90 profiles per week</p>
                <p>Send up to 90 requests per week</p>
              </div>
              <hr className={styles.separator} />
            </li>
            <li className={styles.planFeatureItem}>
              <div className={styles.featureHeader}>
                <FontAwesomeIcon icon={faCheckCircle} className={styles.tickIcon} />
                <strong>Monthly Limits</strong>
              </div>
              <div className={styles.featureContent}>
                <ul>
                  <li>View up to 300 profiles per month</li>
                  <li>Send up to 300 requests per month</li>
                </ul>
              </div>
              <hr className={styles.separator} />
            </li>
            <li className={styles.planFeatureItem}>
              <div className={styles.featureHeader}>
                <FontAwesomeIcon icon={faCheckCircle} className={styles.tickIcon} />
                <strong>Premium Features</strong>
              </div>
              <div className={styles.featureContent}>
                <ul>
                  <li>Unlock Unlimited Messages</li>
                  <li>Unlock Shortlist Page</li>
                  <li>View Profiles Who Shortlisted You</li>
                  <li>Sort & Filter Profiles</li>
                </ul>
              </div>
            </li>
          </ul>
          <button className={styles.subscribeButton}>Subscribe</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubscriptionPlan;
