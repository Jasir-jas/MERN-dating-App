import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCompass, faUserGroup, faComment } from '@fortawesome/free-solid-svg-icons';
import styles from './footerProfileView.module.css';

const Footer = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  
  const icons = [
    { icon: faHome, id: 0, path: '/userhome' },
    { icon: faCompass, id: 1, path: '/explore' },
    { icon: 'rainbow', id: 2, path: '/rainbow' },
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
    // navigate(path);
  };

  return (
    <footer className={`d-flex justify-content-around p-3 ${styles.footer}`}>
      {icons.map((item, index) => (
        <button
          key={index}
          className={`${styles.iconButton} ${activeIndex === index ? styles.active : ''}`}
          onClick={() => handleIconClick(index, item.path)}
        >
          {item.icon === 'rainbow' ? (
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