import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './interestModal.module.css';

const InterestModal = ({ show, handleClose }) => {
  const handleSelectInterest = (interest) => {
    handleClose(interest);
  };

  return (
    <Modal show={show} onHide={() => handleClose(null)} 
    centered dialogClassName={styles.modalDialog} 
    contentClassName={styles.modalContent} 
    >
      <Modal.Body className={`text-center`}>
        <h5 className={styles.modalTitle}>Interested in</h5>
        <Button variant="primary" className={`my-2 w-100 ${styles.btnPrimary}`} onClick={() => handleSelectInterest('MEN')}>MEN</Button>
        <Button variant="danger" className={`my-2 w-100 ${styles.btnDanger}`} onClick={() => handleSelectInterest('WOMEN')}>WOMEN</Button>
        <Button variant="info" className={`my-2 w-100 ${styles.btnInfo}`} onClick={() => handleSelectInterest('BOTH')}>BOTH</Button>
      </Modal.Body>
    </Modal>
  );
};

export default InterestModal;
