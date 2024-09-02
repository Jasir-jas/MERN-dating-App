import React, { useContext, useEffect, useState } from 'react';
import { Row, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styles from './profiles.module.css';
import profile1 from '../../assets/profile1.jpg';
import profile2 from '../../assets/profile2.jpg';
import profile3 from '../../assets/profile3.jpg';
import { Link } from 'react-router-dom';
import { fetchAllProfiles } from '../../Services/userHomeProfilesAPI';
import { UserContext } from '../Context/UserContext';
import default_profile from '../../assets/default_profile.jpg';


const Profiles = () => {
  const { user } = useContext(UserContext)
  const [allProfiles, setAllProfiles] = useState([])
  // const profiles = [
  //   { name: 'Sithara Nair', role: 'Developer, Hyderabad', sex: 'F', age: 26, img: profile1 },
  //   { name: 'Sithara Nair', role: 'Designer, Mumbai', sex: 'F', age: 26, img: profile2 },
  //   { name: 'Sithara Nair', role: 'Manager, Delhi', sex: 'F', age: 26, img: profile3 },
  //   { name: 'Sithara Nair', role: 'Developer, Hyderabad', sex: 'F', age: 26, img: profile1 },
  //   { name: 'Sithara Nair', role: 'Designer, Mumbai', sex: 'F', age: 26, img: profile2 },
  //   { name: 'Sithara Nair', role: 'Manager, Delhi', sex: 'F', age: 26, img: profile3 },
  // ];

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetchAllProfiles()
        if (response && response.success) {
          console.log("Fetched Profiles:", response.profiles);
          setAllProfiles(response.profiles)
        }
      } catch (error) {
        console.log('Fetching errors');
      }
    }
    fetchAllUsers()
  }, [])

  return (
    <section className={styles.profiles}>
      <Row>
        {allProfiles.map((profile, index) => (
          <div key={index} className={`${styles.col} ${styles['col-xs-6']} ${styles['col-md-4']} ${styles['col-lg-2']} ${styles.marginBottom4}`}>
            <div className={styles.profileCard}>
              <Link to={`/profileView/${profile._id}`}>
                <Image src={profile ? profile.profile.profile_image_urls[0] : default_profile} rounded />
              </Link>

              <div className={styles.status}>Online</div>
              <div className={styles.profileInfo}>
                <p className={styles.name}>{profile.name}   <span className={styles.ageRole}>{profile.profile.gender} {profile.profile.age}YRS</span></p>
                <p className={styles.role}>
                  {profile.employer ?
                    profile.employer.type === 'employer'
                      ? `${profile.employer.designation}, ${profile.employer.location}`
                      : profile.employer.jobTitle
                    : null
                  }
                </p>
              </div>
              <div className={styles.actionButtons}>
                <button className={styles.iconButton}><FontAwesomeIcon icon={faHeart} /></button>
                <button className={styles.iconButton}><FontAwesomeIcon icon={faComment} /></button>
                <button className={styles.iconButton}><FontAwesomeIcon icon={faEllipsisH} /></button>
              </div>
            </div>
          </div>
        ))}
      </Row>
    </section>
  );
};

export default Profiles;
