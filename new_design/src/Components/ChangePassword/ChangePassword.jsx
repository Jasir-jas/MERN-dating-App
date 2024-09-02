import React, { useState } from 'react';
import styles from './ChangePassword.module.css';
import { Link } from 'react-router-dom';
import { changePasswordAPI } from '../../Services/changePasswordAPI';

const ChangePassword = () => {
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value
    })
  }
  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword)
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmNewPassword) {
      setError('New Password does not match with Confirm Password');
      setTimeout(() => {
        setError('');
      }, 2000)
      return;
    }
    try {
      const response = await changePasswordAPI({
        currentPassword: password.currentPassword,
        newPassword: password.newPassword
      });

      if (response.success) {
        setMessage(response.message);
        setTimeout(() => {
          setMessage('');
        }, 2000);
      } else {
        setError(response.error || 'Failed to change the password');
        setTimeout(() => {
          setError('');
        }, 2000);
      }
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to='/edit-my-profile' style={{ textDecoration: 'none' }}>
          <button className={styles.backButton}>&lt;</button>
        </Link>
        <h1>Change Password</h1>
      </div>
      <div className={styles.content}>
        <p className={styles.message}>
          Feeling worried about your account been easily preyed on? Then change that password now!
        </p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              name='currentPassword'
              value={password.currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
            />
            <p className={styles.eyeButton}
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
              {showCurrentPassword ? '👁️' : '🙈'}
            </p>
          </div>
          <div className={styles.inputGroup}>
            <input
              type={showNewPassword ? 'text' : 'password'}
              name='newPassword'
              value={password.newPassword}
              onChange={handleChange}
              placeholder="New Password"
            />
            <p className={styles.eyeButton}
              onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? '👁️' : '🙈'}
            </p>
          </div>
          <div className={styles.inputGroup}>
            <input
              type={showConfirmNewPassword ? 'text' : 'password'}
              name='confirmNewPassword'
              value={password.confirmNewPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            <p className={styles.eyeButton}
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
              {showConfirmNewPassword ? '👁️' : '🙈'}
            </p>
          </div>

          <button type="submit" className={styles.updateButton}>Update</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {message && <p style={{ color: 'green' }}>{message}</p>}

        </form>
      </div>
    </div>
  );
};

export default ChangePassword;