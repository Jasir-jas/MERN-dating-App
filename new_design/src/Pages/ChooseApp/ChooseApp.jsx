import React, { useState } from 'react';
import styles from './ChooseApp.module.css';
import LandingPage from '../LandingPage/LandingPage';
import { ChooseAppAPI } from '../../Services/chooseAppAPI'
import { useNavigate } from 'react-router-dom';

const ChooseApp = () => {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = async (option) => {
    const ChooseApp = {
      chooseApp: option
    }
    console.log("Selected Option:", option);
    setSelectedOption(option);
    try {
      const response = await ChooseAppAPI(ChooseApp)
      console.log("Saved Successfully", response);
      if (response.success) {
        navigate('/userhome')
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Server not responded', error)
    }
  };

  return (
    <>
      <LandingPage />
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2>Interested</h2>
          <div className={styles.buttonContainer}>
            <button
              className={`${styles.optionButton} ${selectedOption === 'Dating' ? styles.selected : ''}`}
              onClick={() => handleOptionClick('Dating')}
            >
              Dating
            </button>
            <button
              className={`${styles.optionButton} ${selectedOption === 'Matrimony' ? styles.selected : ''}`}
              onClick={() => handleOptionClick('Matrimony')}
            >
              Matrimony
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseApp;