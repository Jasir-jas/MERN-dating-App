import React, { useState, useEffect, useContext } from 'react';
import styles from './LandingPage.module.css'; // Import the CSS module
import avatar1 from '../../assets/WomanWearingPinkCollaredHalfSleevedTop1036623.jpeg';
import avatar2 from '../../assets/Ellipse13.png';
import avatar3 from '../../assets/PexelsDzianaHasanbekava5480696.jpeg';
import avatar4 from '../../assets/PexelsJonaorle4626207.jpeg';
import avatar5 from '../../assets/Rectangle.jpeg';
import avatar6 from '../../assets/User2.png';
import avatar7 from '../../assets/User21.png';
import avatar8 from '../../assets/WomanWearingPinkCollaredHalfSleevedTop1036623.jpeg';
import locationIcon from '../../assets/Vector48_x2.svg'
import messageIcon from '../../assets/message.svg'
import { ReactComponent as GoogleLogo } from '../../assets/FlatColorIconsgoogle18_x2.svg'; // Import SVG as React component
import { ReactComponent as PhoneIcon } from '../../assets/Group6_x2.svg'; // Import SVG as React component
import { Register, Login } from '../../Services/authServices';
import { useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../../Components/Context/UserContext'
import LoadingPage from '../../Components/LoadingPage/LoadingPage';
const avatars = [
  { src: avatar1, top: '20%', left: '-2%' },
  { src: avatar2, top: '1%', left: '70%' },
  { src: avatar3, top: '65%', left: '-2%' },
  { src: avatar4, top: '50%', left: '92%' },
  { src: avatar5, top: '43%', left: '43%' },
  { src: avatar6, top: '72%', left: '22%' },
  { src: avatar7, top: '25%', left: '75%' },
  { src: avatar8, top: '85%', left: '70%' },
  { src: locationIcon, top: "-6%", left: "28%" },
  { src: messageIcon, top: "91%", left: "30%" }
];

const LandingPage = () => {
  const { user, fetchUserDetails } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [generateOpt, setGenerateOtp] = useState(false)

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirm_pass: '',
    otp: ''
  })
  const [loginData, setLoginData] = useState({
    identifier: '',
    password: ''
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (location.pathname === '/') {
      localStorage.removeItem('token')
      console.log('Token removed from localstorage');
    }

  }, [location])
  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value

    })
  }
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsLoginModalOpen(false)
    setGenerateOtp(false)
  };

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false);
    setGenerateOtp(false)
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignUpModalOpen(false)
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const { name, email, mobile, password, confirm_pass } = registerData
    if (password !== confirm_pass) {
      console.log('Password not match');
      setError('Password not match')
      return
    }
    try {
      const response = await Register({ name, email, mobile, password })
      console.log('Registration successful:', response)
      setRegisterData({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirm_pass: '',
        otp: ''
      })
      if (response.success) {
        localStorage.setItem('token', response.token)
        console.log('Token stored:', response.token);
        setMessage(response.message)
        navigate('/personalDetail')
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false)
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await Login(loginData);
      setLoginData({ identifier: '', password: '' });

      if (response.success) {
        localStorage.setItem('token', response.token);
        console.log('Token stored:', response.token);
        setMessage(response.message);

        // Fetch user details to update the context and get the user data
        const user = await fetchUserDetails(response.token);

        // Use the fetched user data to navigate
        navigateBasedOnUser(user);
      } else {
        setError(response.error);
      }
    } catch (error) {
      console.error('Login process failed:', error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false)
    }
  };

  const navigateBasedOnUser = (user) => {
    setLoading(true)
    if (
      user?.profile &&
      user?.employer &&
      user?.relationShipGoal &&
      user?.chooseApp &&
      user?.userInterest
    ) {
      navigate('/userhome');
    } else {
      navigate('/personalDetail');
    }
    setLoading(false)
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log(`URL: ${window.location.href}`); // Log the entire URL
    console.log(`Token from URL: ${token}`); // Log the token

    if (token) {
      localStorage.setItem('token', token);
      // Fetch user details and navigate based on profile completion
      const fetchAndNavigate = async () => {
        setLoading(true)
        const user = await fetchUserDetails(token); // Fetch user details

        if (user?.profile && user?.employer && user?.relationShipGoal && user?.chooseApp) {
          // window.location.replace('/userhome');
          navigate('/userhome')
        } else {
          // window.location.replace('/personalDetail');
          navigate('/personalDetail')
        }
      };
      fetchAndNavigate();
    } else {
      console.log('Token not found in URL');
      // setLoading(false)
    }
  }, []);

  const handleGoogleLogin = () => {
    setLoading(true)
    window.open('http://localhost:4000/auth/google', '_self');
  };

  if (loading) {
    return <LoadingPage />
  }

  return (
    <div className={styles.container}>
      <div className={styles.circleContainer}>
        <div className={`${styles.circle} ${styles.large}`}></div>
        <div className={`${styles.circle} ${styles.medium}`}></div>
        <div className={`${styles.circle} ${styles.small}`}></div>
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar.src}
            className={styles.avatar}
            style={{ top: avatar.top, left: avatar.left }}
            alt={`avatar ${index + 1}`}
          />
        ))}
      </div>

      <h1 className={styles.title}>Let’s meeting new people around you</h1>
      <button className={`${styles.btn} ${styles.primary}`} onClick={openLoginModal}>
        <PhoneIcon className={styles.iconImage} />
        Login with Phone
      </button>

      <button type='submit' className={`${styles.btn} ${styles.secondary}`} onClick={handleGoogleLogin}>
        <span><GoogleLogo className={styles.iconImage} /></span>
        Login with Google
        {/* </Link> */}
      </button>

      <p className={styles.signupText}>
        Don't have an account? <a href="#signup" onClick={openSignUpModal}>Sign Up</a>
      </p>
      {isSignUpModalOpen && (
        <div className={styles.modalOverlay} onClick={closeSignUpModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Sign up</h2>

            <form onSubmit={handleSubmit}>

              <label>Name</label>
              <input type="text"
                placeholder="Name"
                value={registerData.name}
                name='name'
                onChange={handleChange}
              />

              <label>Email</label>
              <input type="email"
                placeholder="Email"
                value={registerData.email}
                name='email'
                onChange={handleChange}
              />

              <label>Mobile</label>
              <input type="number"
                placeholder="Mobile Number"
                value={registerData.mobile}
                name='mobile'
                onChange={handleChange}
              />

              <label>Password</label>
              <input type="password"
                placeholder="********"
                value={registerData.password}
                name='password'
                onChange={handleChange}
              />
              <label>Confirm Password</label>
              <input type="password"
                placeholder="**********"
                value={registerData.confirm_pass}
                name='confirm_pass'
                onChange={handleChange}
              />

              {!generateOpt && <a href="#forgot-password" onClick={() => setGenerateOtp(true)}>Genrerate OTP</a>}
              {generateOpt && <><label>OTP</label>
                <input type="text"
                  placeholder="Enter OTP"
                  value={registerData.otp}
                  name='otp'
                  onChange={handleChange}
                /></>}

              <button className={`${styles.btn} ${styles.social}`}>Social Login</button>
              <button type='submit' className={`${styles.btn} ${styles.register}`}>Register</button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {message && <p style={{ color: 'red' }}>{message}</p>}

            </form>

            <p className={styles.signupText}>
              Already have an account? <a href="#signup" onClick={openLoginModal}>Sign in</a>
            </p>
          </div>
        </div>
      )}
      {isLoginModalOpen && (
        <div className={styles.modalOverlay} onClick={closeLoginModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>

            <form onSubmit={handleLoginSubmit}>
              <label>Email/Mobile</label>
              <input type="text"
                placeholder="Email/Mobile"
                name='identifier'
                onChange={handleLoginChange}
              />

              <label>Password</label>
              <input type="password"
                placeholder="Paasword"
                name='password'
                onChange={handleLoginChange}
              />
              <button className={`${styles.btn} ${styles.register}`}>Log In</button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {message && <p style={{ color: 'red' }}>{message}</p>}
            </form>

            <p className={styles.forgotPassword}>
              <a href="#forgot-password">Forgot password?</a>
            </p>
            <p className={styles.signupText}>
              Don't have an account? <a href="#signup" onClick={openSignUpModal}>Sign Up</a>
            </p>
          </div>
        </div>
      )}

    </div>
  );
};

export default LandingPage;