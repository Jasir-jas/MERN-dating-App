import React, { useState } from 'react';
import JobStyles from './jobstatusModal.module.css'; // Import the CSS module
import LandingPage from '../LandingPage/LandingPage';
import { JobStatusAPI } from '../../Services/jobStatusAPI';
import { useNavigate } from 'react-router-dom';



const JobStatusComponent = () => {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState('');
  const [step, setStep] = useState(0);
  // const [expertiseLevel, setExpertiseLevel] = useState('');
  const [employer, setEmployer] = useState({
    companyName: '',
    designation: '',
    location: ''
  })

  const [jobSeeker, setJobSeeker] = useState({
    jobTitle: '',
    expertiseLevel: ''
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleRadioChange = (event) => {
    console.log("value:", event.target.value);
    setSelectedOption(event.target.value);
  };

  const handleNext = () => {
    if (selectedOption) {
      setStep(1);
    }
  };

  const handleExpertiseChange = (event) => {
    setJobSeeker({
      ...jobSeeker,
      expertiseLevel: event.target.value // Update expertiseLevel directly in jobSeeker state
    });
  };

  const handleEmployerChange = (e) => {
    setEmployer({
      ...employer,
      [e.target.name]: e.target.value
    })
  }

  const handleJobSeekerChange = (e) => {
    setJobSeeker({
      ...jobSeeker,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (selectedOption === 'employer') {
        await JobStatusAPI({ type: 'employer', ...employer })
      } else if (selectedOption === 'jobSeeker') {
        await JobStatusAPI({ type: 'jobSeeker', ...jobSeeker })
      }
      setMessage('Saved')
      navigate('/relationship-goals')
    } catch (error) {
      console.error('Error saving job status:', error);
      setError('Error saving job status')
    }
  }

  return (
    <>
      <LandingPage />
      <div>
        {step === 0 && (
          <div className={JobStyles.modalOverlay}>
            <div className={JobStyles.modal}>
              <h2>Job Status</h2>
              <form>
                <label>
                  <input
                    type="radio"
                    name="jobStatus"
                    value="employer"
                    checked={selectedOption === 'employer'}
                    onChange={handleRadioChange}
                  />
                  Employer/Employee
                </label>
                <label>
                  <input
                    type="radio"
                    name="jobStatus"
                    value="jobSeeker"
                    checked={selectedOption === 'jobSeeker'}
                    onChange={handleRadioChange}
                  />
                  Job Seeker
                </label>
                <button type="button" className={JobStyles.btnNext} onClick={handleNext}>
                  Next
                </button>
              </form>
            </div>
          </div>
        )}

        {step === 1 && selectedOption === 'employer' && (
          <div className={JobStyles.modalOverlay}>
            <div className={JobStyles.modal}>
              <h2>Job Details</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="companyName"
                  value={employer.companyName}
                  onChange={handleEmployerChange}
                  placeholder="Company Name"
                />
                <input
                  type="text"
                  name="designation"
                  value={employer.designation}
                  onChange={handleEmployerChange}
                  placeholder="Designation"
                />
                <input
                  type="text"
                  name="location"
                  value={employer.location}
                  onChange={handleEmployerChange}
                  placeholder="Location"
                />
                <button type="submit" className={JobStyles.btnNext}>
                  Next
                </button>
              </form>
            </div>
          </div>
        )}

        {step === 1 && selectedOption === 'jobSeeker' && (
          <div className={JobStyles.modalOverlay}>
            <div className={JobStyles.modal}>
              <h2>Job Details</h2>
              <form onSubmit={handleSubmit}>
                <input type="text"
                  name="jobTitle"
                  placeholder="Job Title"
                  value={jobSeeker.jobTitle}
                  onChange={handleJobSeekerChange}
                  required
                />
                <h3 className={JobStyles.expertiseHeading}>Expertise Level</h3>
                <label>
                  <input
                    type="radio"
                    name="expertiseLevel"
                    value="beginner"
                    checked={jobSeeker.expertiseLevel === 'beginner'}
                    onChange={handleExpertiseChange}
                  />
                  Beginner
                </label>
                <label>
                  <input
                    type="radio"
                    name="expertiseLevel"
                    value="intermediate"
                    checked={jobSeeker.expertiseLevel === 'intermediate'}
                    onChange={handleExpertiseChange}
                  />
                  Intermediate
                </label>
                <label>
                  <input
                    type="radio"
                    name="expertiseLevel"
                    value="expert"
                    checked={jobSeeker.expertiseLevel === 'expert'}
                    onChange={handleExpertiseChange}
                  />
                  Expert
                </label>
                <button type="submit" className={JobStyles.btnNext}>
                  Next
                </button>
                {message && <p style={{ color: 'green' }}>{message}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

              </form>
            </div>
          </div>
        )}
      </div>
    </>);
};

export default JobStatusComponent;