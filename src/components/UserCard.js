import React from 'react';
import '../styles/UserCard.css';
import GoBackButton from './GoBackButton';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


function UserCard({ user }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="user-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <GoBackButton />
      <img src={user.photoURL} alt={''} />
      <h3>{user.name}</h3>
      <p><strong>מוסד:</strong> {user.institution}</p>
      <p><strong>חוג:</strong> {user.faculty}</p>
      <p><strong>העדפה:</strong> {user.preference === 'zoom' ? 'זום' : user.preference === 'frontal' ? 'פרונטלי' : 'לא משנה'}</p>
      <p><strong>קורסים:</strong> {user.courses.join(', ')}</p>
      <button onClick={() => navigate('/Userprofile')}>
      ✏️ ערוך פרופיל 
</button>
    </motion.div>
  );
}

export default UserCard;
