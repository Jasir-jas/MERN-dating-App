import React, { useContext, useState, useEffect } from 'react';
import styles from './EditMyProfile.module.css';
import default_profile from '../../assets/default_profile.jpg';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { EditProfileAPI, uploadToCloudinary } from '../../Services/editProfileAPI';

const EditMyProfile = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    mobile: '',
    bio: '',
    profile_image_urls: ['', '', '', ''],
    profile_video_urls: ''
  });

  const [editableImageIndex, setEditableImageIndex] = useState(null);

  useEffect(() => {
    if (user && user.profile && user.profile.profile_image_urls &&
      user.profile.profile_video_urls) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        mobile: user.mobile || '',
        bio: user.profile.bio || '',
        profile_image_urls: user.profile.profile_image_urls || ['', '', '', ''],
        profile_video_urls: user.profile.profile_video_urls || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const cloudinaryUrl = await uploadToCloudinary(file);
        const newProfileImageUrls = [...formData.profile_image_urls];
        newProfileImageUrls[index] = cloudinaryUrl;
        setFormData({
          ...formData,
          profile_image_urls: newProfileImageUrls
        });
        setEditableImageIndex(null);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const cloudinaryUrl = await uploadToCloudinary(file);
        setFormData({
          ...formData,
          profile_video_urls: cloudinaryUrl
        });
        setEditableImageIndex(null);
      } catch (error) {
        console.error('Error uploading video:', error);
        // Handle error (e.g., show error message to user)
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await EditProfileAPI(formData)
      if (response.success) {
        setMessage(response.message)
        console.log('Profile Updated', response);
        setTimeout(() => {
          setMessage('')
        }, 2000)
      } else {
        setError('Some thing went wrong')
      }
    } catch (error) {
      console.log('Server not responded');
    }
  }

  return (
    <div className={styles.editProfileContainer}>
      <header className={styles.profileHeader}>
        <div className={styles.backButtonContainer}>
          <Link to='/ownProfileview' style={{ textDecoration: 'none' }}>
            <button className={styles.backButton}>&lt;</button>
          </Link>
        </div>
        <h1>Edit My Profile</h1>
      </header>

      <div className={styles.userProfile}>
        <div className={styles.profileInfo}>
          <img src={user ? user.profile.profile_image_urls[0] : default_profile} alt="Profile" className={styles.profilePicture} />
          <div className={styles.textInfo}>
            <h2>{user ? user.name : 'Guest'}</h2>
            <p className={styles.profileMotto}>Never give up 💪</p>
          </div>
        </div>

        <p className={styles.infoMessage}>All your account information can be accessed and
          edited here but your mail will still remain un-edited.</p>

        <form className={styles.editForm} onSubmit={handleSubmit}>
          <input type="text" placeholder="Name"
            name='name'
            onChange={handleChange}
            value={formData.name}
          />

          <input type="text" placeholder="Username"
            name='username'
            value={formData.username}
            onChange={handleChange}
          />

          <input type="email" placeholder="Email"
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          <input type="number" placeholder="Phone Number"
            name='mobile'
            value={formData.mobile}
            onChange={handleChange}
          />
          <textarea placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            name='bio'
          ></textarea>

          <h5>Images</h5>
          <div className={styles.imageGrid}>
            {formData.profile_image_urls.map((url, index) => (
              <div key={index} className={styles.imageContainer}>
                <label htmlFor={`imageUpload${index}`} className={styles.imageLabel}>
                  <img
                    src={url || default_profile}
                    alt={`Profile ${index + 1}`}
                    className={styles.uploadedImage}
                  />
                </label>
                <input
                  type="file"
                  id={`imageUpload${index}`}
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleImageUpload(e, index)}
                />
              </div>
            ))}
          </div>

          <div className={styles.reelsSection}>
            <h5>Reel</h5>
            <div className={styles.reelContainer}>
              {formData.profile_video_urls ? (
                <div
                  onClick={() => document.getElementById('videoUpload').click()}
                  className={styles.uploadedVideoContainer}
                >
                  <video
                    src={formData.profile_video_urls}
                    className={styles.uploadedVideo}
                    onClick={(e) => e.preventDefault()} // Prevent the video from playing
                  />
                </div>
              ) : (
                <label htmlFor="videoUpload" className={styles.addReel}>
                  +
                  <input
                    type="file"
                    id="videoUpload"
                    accept="video/*"
                    style={{ display: 'none' }}
                    onChange={handleVideoUpload}
                  />
                </label>
              )}
            </div>
          </div>
          {user && user.googleId
            ? null  // If googleId exists, don't render the button
            : (
              <Link to='/change-password'>
                <button type="button" className={styles.changePassword}>Change Password</button>
              </Link>
            )
          }
          <button type="submit" className={styles.updateButton}>Update</button>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

        </form>
      </div>
    </div>
  );
};

export default EditMyProfile;

