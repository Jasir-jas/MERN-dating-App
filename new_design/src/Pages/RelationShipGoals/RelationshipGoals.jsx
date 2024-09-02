import React, { useEffect, useState } from 'react';
import styles from './RelationshipGoals.module.css';
import LandingPage from '../LandingPage/LandingPage';
import { RelationStatus, getLocationName } from '../../Services/relationShipAPI';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../../Components/LoadingPage/LoadingPage';

const RelationshipGoals = () => {
  const navigate = useNavigate();
  const [selectedGoal, setSelectedGoal] = useState('shortTerm');
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState(null);
  const [gender, setGender] = useState('');
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [manualLocation, setManualLocation] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentStep === 2 && !locationPermissionDenied) {
      setIsLoading(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
              const locationName = await getLocationName(lat, lon);
              setLocation({
                lat,
                lon,
                name: locationName
              });
            } catch (error) {
              console.error('Error fetching location name:', error);
              setError('Unable to fetch location. Please enter manually.');
              setLocationPermissionDenied(true);
            } finally {
              setIsLoading(false);
            }
          },
          (error) => {
            console.error('GeoLocation error', error);
            setError('Location permission denied. Please enter manually.');
            setLocationPermissionDenied(true);
            setIsLoading(false);
          }
        );
      } else {
        console.error('Geo Location not supported by this Browser');
        setError('Geolocation not supported. Please enter location manually.');
        setLocationPermissionDenied(true);
        setIsLoading(false);
      }
    }
  }, [currentStep, locationPermissionDenied]);


  const handleNext = async () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setIsLoading(true);
      const relationStatus = {
        relationShipGoal: selectedGoal,
        location: location && typeof location === 'object' ? location : { name: location },
        gender,
      };
      try {
        const response = await RelationStatus(relationStatus);
        console.log('Successfully added goal and details', response);
        if (response.success) {
          navigate('/choose-app');
        } else {
          setError('Unexpected response from server');
        }
      } catch (error) {
        console.error('Server not responded', error);
        setError('Failed to save data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <LandingPage />
      <div className={styles.overlay}>
        <div className={styles.modal}>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <>
              {currentStep === 1 && (
                <>
                  <h2>Relationship Goals</h2>
                  <div className={styles.radioContainer}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="relationshipGoal"
                        value="shortTerm"
                        checked={selectedGoal === 'shortTerm'}
                        onChange={() => setSelectedGoal('shortTerm')}
                      />
                      Short Term Relationship
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="relationshipGoal"
                        value="longTerm"
                        checked={selectedGoal === 'longTerm'}
                        onChange={() => setSelectedGoal('longTerm')}
                      />
                      Long Term Relationship
                    </label>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <h2>Additional Information</h2>
                  <div className={styles.inputContainer}>
                    <label>
                      Location:
                      {locationPermissionDenied ? (
                        <input
                          type="text"
                          placeholder='Eg: Street, State'
                          value={manualLocation}
                          onChange={(e) => setManualLocation(e.target.value)}
                        />
                      ) : (
                        <p>{location?.name || 'Location not available'}</p>
                      )}
                    </label>
                  </div>

                  <div className={styles.radioContainer}>
                    <h5>Gender:</h5>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === 'male'}
                        onChange={() => setGender('male')}
                      />
                      Male
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === 'female'}
                        onChange={() => setGender('female')}
                      />
                      Female
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={gender === 'other'}
                        onChange={() => setGender('other')}
                      />
                      Other
                    </label>
                  </div>
                </>
              )}

              <button className={styles.nextButton} onClick={handleNext} disabled={isLoading}>
                {currentStep === 1 ? 'Next' : 'Submit'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};


export default RelationshipGoals;
