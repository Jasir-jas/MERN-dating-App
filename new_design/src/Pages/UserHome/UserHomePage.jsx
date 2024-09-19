import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../Components/HeaderUserHome/HeaderUserHome';
import Stories from '../../Components/Stories/Stories';
import Filters from '../../Components/Filters/Filters';
import Profiles from '../../Components/Profiles/Profiles';
import Footer from '../../Components/Footer/Footer';
import InterestModal from '../../Components/InterestModal/InterestModal';
import LeftSideMenu from '../../Components/LeftSideMenu/LeftSideMenu';
import styles from './userHomePage.module.css';
import Notifications from '../Notifaction/Notifications';
import { UserInterest } from '../../Services/userInterestAPI';
import { UserContext } from '../../Components/Context/UserContext';
import LoadingPage from '../../Components/LoadingPage/LoadingPage';

function UserHomePage() {
  const { user, fetchUserDetails } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [notificationView, setNotificationView] = useState(false);
  const [leftSideNavBar, setLeftSideNavBar] = useState(false);
  const [loading, setLoading] = useState(true); // Start with loading true

  const handleModalClose = async (userInterest) => {
    if (userInterest) {
      setLoading(true);
      try {
        const response = await UserInterest(userInterest);
        if (response) {
          const token = localStorage.getItem('token');
          console.log('User Interest successfully updated:', response);
          await fetchUserDetails(token);
        } else {
          console.log('Failed to update user interest.');
        }
      } catch (error) {
        console.error('Error updating user interest:', error);
      } finally {
        setLoading(false);
      }
    }
    setModalShow(false);
  };

  useEffect(() => {
    const checkUserInterest = async () => {
      const token = localStorage.getItem('token');
      await fetchUserDetails(token); // Ensure user details are fetched

      // Only update modal state if the user data is fully fetched
      if (user && user.userInterest === undefined) {
        setModalShow(true);
      }
      setLoading(false); // Stop loading after user details are fetched
    };

    if (user === null) {
      checkUserInterest();  // Only call if user hasn't been fetched yet
    } else if (user.userInterest === undefined) {
      setModalShow(true);  // Directly set the modal if userInterest is undefined
    } else {
      setModalShow(false);  // Close modal if userInterest exists
      setLoading(false);  // Stop loading if user is already loaded
    }
  }, [user]);  // Depend on user only

  if (loading) {
    return <LoadingPage />;
  }

  const handleLeftsideMenu = () => {
    leftSideNavBar && setLeftSideNavBar(false);
  };

  return (
    <Container fluid className={`${styles.appContainer} ${modalShow ? styles.blurBackground : ''}`} onClick={handleLeftsideMenu}>
      <Header setLeftSideNavBar={setLeftSideNavBar} setNotificationView={setNotificationView} />
      {leftSideNavBar && <LeftSideMenu />}
      {notificationView && <Notifications setNotificationView={setNotificationView} />}
      <Stories />
      <Filters />
      <Profiles />
      <Footer />
      <InterestModal show={modalShow} handleClose={handleModalClose} />
    </Container>
  );
}

export default UserHomePage;
