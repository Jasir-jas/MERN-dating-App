import React, { useState } from "react";
import PersonalStyles from "./PersonalDetails.module.css"
import LandingPage from "../LandingPage/LandingPage";
import { Profile, Upload } from "../../Services/PersonalDetails";
import { useNavigate } from "react-router-dom";
// import { Uploads } from "../../../../backend/Controllers/Uploads";

const PersonalDetail = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    age: '',
    dateofbirth: '',
    hobbies: '',
    interest: '',
    qualification: '',
    smokingHabits: '',
    drinkingHabits: '',
    profile_image_urls: ['', '', '', ''],
    profile_video_urls: ''
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReelChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        profile_video_urls: file
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Split hobbies and interests by commas into arrays
      const hobbiesArray = formData.hobbies.split(',').map(hobby => hobby.trim());
      const interestArray = formData.interest.split(',').map(interest => interest.trim());

      // Prepare image and video files for upload
      const imagesToUpload = formData.profile_image_urls.filter(file => file instanceof File);
      const reelToUpload = formData.profile_video_urls instanceof File ? [formData.profile_video_urls] : [];
      const allFiles = [...imagesToUpload, ...reelToUpload];
      console.log("Files to upload:", allFiles);

      // Upload the files to Cloudinary and get back the URLs
      const fileUrls = await Upload(allFiles);
      console.log("Uploaded file URLs:", fileUrls);

      if (fileUrls.length === 0) {
        throw new Error("No file URLs received from upload.");
      }

      // Split the URLs into image URLs and video URL
      const imageUrls = fileUrls.slice(0, imagesToUpload.length);
      const videoUrl = reelToUpload.length > 0 ? fileUrls[imagesToUpload.length] : null;

      if (reelToUpload.length > 0 && !videoUrl) {
        throw new Error("Video URL not received.");
      }

      // Prepare the final form data with the correct URLs and split arrays
      const finalFormData = {
        ...formData,
        profile_image_urls: imageUrls,
        profile_video_urls: videoUrl,
        hobbies: hobbiesArray,  // Update hobbies field with the split array
        interest: interestArray  // Update interest field with the split array
      };
      console.log("Final form data:", finalFormData);

      // Submit the profile data
      const response = await Profile(finalFormData);
      console.log("Profile successfully added", response);
      if (response.success) {
        setMessage(response.message);
        navigate('/employement');
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
    }
  };


  const handleSpecificImageChange = (index) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevData => ({
        ...prevData,
        profile_image_urls: prevData.profile_image_urls.map((item, i) =>
          i === index ? file : item
        )
      }));
    }
  };

  return <>
    <LandingPage />
    <form className={PersonalStyles.modalOverlay} onSubmit={handleSubmit}>
      <div className={PersonalStyles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={PersonalStyles.personalDetailsForm}>
          <h2>Personal Details</h2>
          <input type="text" placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />

          <input type="date" placeholder="DOB"
            name="dateofbirth"
            value={formData.dateofbirth}
            onChange={handleChange}
          />

          <input type="text" placeholder="Hobbies"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleChange}
          />

          <input type="text" placeholder="Interests"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
          />

          <input type="text" placeholder="Smoking Habits"
            name="smokingHabits"
            value={formData.smokingHabits}
            onChange={handleChange}
          />

          <input type="text" placeholder="Drinking Habits"
            name="drinkingHabits"
            value={formData.drinkingHabits}
            onChange={handleChange}
          />

          <input type="text" placeholder="Qualifications"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
          />

          {/* Image uploader */}

          <div className={PersonalStyles.imageUploadersContainer}>
            {formData.profile_image_urls.map((url, index) => (
              <div key={index} className={PersonalStyles.imageUploaderWrapper}>
                <label htmlFor={`image-${index}`} className={PersonalStyles.imageUploader}>
                  <input
                    type="file"
                    id={`image-${index}`}
                    accept="image/*"
                    onChange={handleSpecificImageChange(index)}
                    style={{ display: 'none' }}
                  />
                  {url ? (
                    <img src={URL.createObjectURL(url)} alt={`Uploaded ${index}`} className={PersonalStyles.uploadedImage} />
                  ) : (
                    <span className={PersonalStyles.uploadIcon}>🖼️</span>
                  )}
                </label>
              </div>
            ))}
          </div>

          {/* Video uploader */}

          <div className={PersonalStyles.reelUploaderWrapper}>
            <label htmlFor="reel-upload" className={PersonalStyles.reelUploader}>
              <input
                type="file"
                id="reel-upload"
                accept="video/*"
                onChange={handleReelChange}
                style={{ display: 'none' }}
              />
              {formData.profile_video_urls ? (
                <video src={URL.createObjectURL(formData.profile_video_urls)} className={PersonalStyles.uploadedReel} controls />
              ) : (
                <span className={PersonalStyles.uploadIcon}>🎥</span>
              )}
            </label>
          </div>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Next</button>
        </div>
      </div>
    </form>

  </>
}
export default PersonalDetail;