import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCompass, faUserGroup, faComment } from '@fortawesome/free-solid-svg-icons';
import styles from './footer.module.css';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const icons = [
    { icon: faHome, id: 0, path: '/userhome' },
    { icon: faCompass, id: 1, path: '/explore' },
    { icon: 'near-by-user', id: 2, path: '/near-by-user' },
    { icon: faUserGroup, id: 3, path: '/qualification' },
    { icon: faComment, id: 4, path: '/messages' }
  ];

  const determineActiveIndex = (pathname) => {
    if (pathname === '/location' || pathname === '/designation') {
      return 3; 
    }
    return icons.findIndex(icon => icon.path === pathname);
  };

  const [activeIndex, setActiveIndex] = useState(determineActiveIndex(location.pathname));

  useEffect(() => {
    setActiveIndex(determineActiveIndex(location.pathname));
  }, [location.pathname]);

  const handleIconClick = (index, path) => {
    setActiveIndex(index);
    navigate(path);
  };

  return (
    <footer className={`d-flex justify-content-around  ${styles.footer}`}>
      {icons.map((item, index) => (
        <button
          key={index}
          className={`${styles.iconButton} ${activeIndex === index ? styles.active : ''}`}
          onClick={() => handleIconClick(index, item.path)}
        >
          {item.icon === 'near-by-user' ? (
            <div
              style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                background: 'conic-gradient(red, yellow, green, cyan, blue, magenta, red)',
              }}
            />
          ) : (
            <FontAwesomeIcon icon={item.icon} />
          )}
        </button>
      ))}
    </footer>
  );
};

export default Footer;
