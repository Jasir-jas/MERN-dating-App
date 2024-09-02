import React from 'react';
import styles from './addCards.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import Visa from '../../assets/visa.png';
import Master from '../../assets/master.png';
import AmericanExp from '../../assets/americanexp.png';
import Discover from '../../assets/discovercard.png';

const AddCards = () => {
    return (
      <div className={styles.pagecontainer}>
        <div className={styles.addcardcontainer}>
          <div className={styles.cardheader}>
            <FontAwesomeIcon icon={faArrowLeft} className={styles.backIcon} />
            <h2 className={styles.cardheading}>Add credit card</h2>
          </div>
          <form className={styles.addCardForm}>
            <div className={styles.addCardFormGroup}>
              <label htmlFor="name" className={styles.addCardLabel}>Name</label>
              <input type="text" id="name" placeholder="Enter name" className={styles.addCardInput} />
            </div>
            <div className={styles.addCardFormGroup}>
              <label htmlFor="cardNumber" className={styles.addCardLabel}>Credit card number</label>
              <input type="text" id="cardNumber" placeholder="**** **** **** 67" className={styles.addCardInput} />
            </div>
            <button type="button" className={styles.addCardScanButton}>
              <FontAwesomeIcon icon={faCreditCard} className={styles.addCardScanIcon} /> Scan card
            </button>
            <div className={styles.addCardRow}>
              <div className={styles.addCardFormGroup}>
                <label htmlFor="expDate" className={styles.addCardLabel}>Express</label>
                <input type="text" id="expDate" placeholder="MM/YY" className={styles.addCardInput} />
              </div>
              <div className={styles.addCardFormGroup}>
                <label htmlFor="cvv" className={styles.addCardLabel}>CVV</label>
                <input type="text" id="cvv" placeholder="***" className={styles.addCardInput} />
              </div>
            </div>
            <div className={styles.addCardFooterText}>
              Debit cards are accepted at some locations and for some categories.
            </div>
            <div className={styles.addCardLogos}>
              <img src={Visa} alt="Visa" />
              <img src={AmericanExp} alt="Amex" />
              <img src={Discover} alt="Discover" />
              <img src={Master} alt="MasterCard" />
            </div>
            <button type="submit" className={styles.addCardAddButton}>ADD PAYMENT METHOD</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default AddCards;
  