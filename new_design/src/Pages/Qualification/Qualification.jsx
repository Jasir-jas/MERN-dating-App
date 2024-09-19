import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faSliders } from '@fortawesome/free-solid-svg-icons';
import styles from './qualification.module.css';
import Footer from '../../Components/Footer/Footer.jsx';
import LikeAndConnect from '../../Components/LikeAndConnect/LikeAndConnect.jsx';
import { Link, useNavigate } from 'react-router-dom';
import ProfileCard from '../../Components/ProfileCard/ProfileCard.jsx';
import { FilterQualification } from '../../Services/FiltersAPI.js';
import LoadingPage from '../../Components/LoadingPage/LoadingPage.jsx';

const Qualification = () => {
  const [showNavigation, setShowNavigation] = useState(false);
  const [qualification, setQualification] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const handleSliderClick = () => {
    setShowNavigation(!showNavigation);
  };
  const handleLeftArrowClick = () => {
    navigate('/userhome');
  }

  useEffect(() => {
    const fetchFilterQualification = async () => {
      try {
        const response = await FilterQualification()
        if (response && response.success) {
          console.log('Qualification:', response.FilterQualifications);
          setQualification(response.FilterQualifications)
        }
      } catch (error) {
        console.log('Frontend API not response', error);
      } finally {
        setLoading(false)
      }
    }
    fetchFilterQualification()
  }, [])

  if (loading) {
    return <LoadingPage />
  }

  return (
    <Container fluid className={styles.userPages}>
      <div className={styles.header}>
        <FontAwesomeIcon icon={faChevronLeft} transform="shrink-8" className={styles.roundButton} onClick={handleLeftArrowClick} />
        <div className={styles.pageTitle}>Qualification</div>
        <FontAwesomeIcon icon={faSliders} transform="shrink-8" className={styles.roundButton} onClick={handleSliderClick} />
      </div>

      {showNavigation && (
        <div className={styles.navigationList}>
          <div className={styles.navigationItem}><Link to='/location' className={styles.navigationLink}>Location</Link></div>
          <div className={styles.navigationItem}><Link to='/designation' className={styles.navigationLink}>Designation</Link></div>
        </div>
      )}

      <LikeAndConnect />
      <div className={styles.matchCount}>
        Your Matches <span className={styles.matchCountNumber}>{qualification.length}</span>
      </div>

      <Row className={styles.matchContainer}>
        {qualification.map((match, index) => (
          <div key={index} className={`${styles.col} ${styles['col-xs-6']} ${styles['col-md-4']} 
          ${styles['col-lg-2']} ${styles.marginBottom4}`}>

            <Link to={`/profileView/${match.userId._id}`}>
              <ProfileCard
                matchPercentage='90%'
                imageUrl={match.profile_image_urls?.[0]}
                // distance={match.distance}
                name={match.userId?.name}
                age={match.age}
                location={match.location?.name}
              />
            </Link>
          </div>
        ))}
      </Row>

      <Footer />
    </Container>
  );
};

export default Qualification;
