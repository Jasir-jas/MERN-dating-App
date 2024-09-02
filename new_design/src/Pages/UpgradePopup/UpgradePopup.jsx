import React, { useState, useEffect } from 'react';
import { Container, Row} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './upgradePopup.module.css';
import Footer from '../../Components/Footer/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
import ProfileCard from '../../Components/ProfileCard/ProfileCard.jsx';
import matches from '../../SampleData.js'; 
import UpgradeModal from '../../Components/UpgradeModal/UpgradeModal.jsx';

function UpgradePopup() {
  const [showNavigation, setShowNavigation] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  const handleSliderClick = () => {
    setShowNavigation(!showNavigation);
  };

  const handleLeftArrowClick = () => {
    navigate('/userhome');
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleUpgradeClick = () => {
    navigate('/upgrade');
  };

  const handleScroll = () => {
    setModalShow(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Container fluid className={styles.userPages}>
      <div className={styles.header}>
        <FontAwesomeIcon icon={faChevronLeft} transform="shrink-8" className={styles.roundButton} onClick={handleLeftArrowClick} />
        <FontAwesomeIcon icon={faSlidersH} transform="shrink-8" className={styles.roundButton} onClick={handleSliderClick} />
      </div>

      {showNavigation && (
        <div className={styles.navigationList}>
          <div className={styles.navigationItem}><Link to='/qualification' className={styles.navigationLink}>Qualification</Link></div>
          <div className={styles.navigationItem}><Link to='/location' className={styles.navigationLink}>Location</Link></div>
          <div className={styles.navigationItem}><Link to='/designation' className={styles.navigationLink}>Designation</Link></div>
        </div>
      )}

      <div className={styles.matchCount}>
        Your Matches <span className={styles.matchCountNumber}>47</span>
      </div>

      <Row className={styles.matchContainer}>
        {matches.map((match, index) => (
         <div key={index} className={`${styles.col} ${styles['col-xs-6']} ${styles['col-md-4']} ${styles['col-lg-2']} ${styles.marginBottom4}`}>
         <ProfileCard
           matchPercentage={match.match}
           imageUrl={match.img}
           distance={match.distance}
           name={match.name}
           age={match.age}
           location={match.location}
         />
       </div>
        ))}
      </Row>

      <Footer />
      <UpgradeModal show={modalShow} handleClose={handleModalClose} handleUpgradeClick={handleUpgradeClick} />
    </Container>
  );
}

export default UpgradePopup;
