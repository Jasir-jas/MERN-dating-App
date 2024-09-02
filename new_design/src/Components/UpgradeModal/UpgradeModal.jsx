import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './upgradeModal.module.css';

function UpgradeModal({ show, handleClose, handleUpgradeClick }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className={styles.modalHeaderCustom}>
        <Modal.Title className={styles.modalTitleCustom}>Upgrade to view more</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBodyCustom}>
        <Button className={styles.upgradeButtonCustom} onClick={handleUpgradeClick}>
          Upgrade
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default UpgradeModal;
