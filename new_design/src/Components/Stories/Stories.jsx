import React from 'react';
import { Image } from 'react-bootstrap';
import styles from './stories.module.css';
import story1 from '../../assets/profile1.jpg';
import story2 from '../../assets/profile2.jpg';
import story3 from '../../assets/profile3.jpg';
import { useNavigate } from 'react-router-dom';

const stories = [
  { src: story1, name: 'My Story', isMyStory: true },
  { src: story2, name: 'Selena' },
  { src: story3, name: 'Clara' },
];

const Stories = () => {
  const navigate=useNavigate()
  return (
    <section className={`d-flex align-items-center ${styles.stories}`}>
      {stories.map((story, index) => (
        <div key={index} className={styles.story}>
          <div className={`${styles.storyImage} ${!story.isMyStory && styles.hasBorder}`} onClick={()=>navigate("/viewstory")}>
            <Image src={story.src} roundedCircle />
            {story.isMyStory && <div className={styles.addIcon}>+</div>}
          </div>
          <p>{story.name}</p>
        </div>
      ))}
    </section>
  );
};

export default Stories;
