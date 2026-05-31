import React from 'react';
import '../styles/UserCard.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function UserCard({ user, showChat = false }) {
  const navigate = useNavigate();
  const isOwnProfile = auth.currentUser?.uid === user.uid;

  return (
    <motion.div
      className="user-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {user.photoURL ? (
        <img src={user.photoURL} alt={user.name} className="user-card-photo" />
      ) : (
        <div className="user-card-photo-placeholder">
          {user.name?.charAt(0) || '?'}
        </div>
      )}
      <h3 className="user-card-name">{user.name}</h3>
      <div className="user-card-info">
        <p><strong>מוסד:</strong> {user.institution}</p>
        <p><strong>חוג:</strong> {user.faculty}</p>
        <p><strong>העדפה:</strong> {user.preference === 'zoom' ? '💻 זום' : user.preference === 'frontal' ? '🏫 פרונטלי' : '🤷 לא משנה'}</p>
        <p><strong>קורסים:</strong> {user.courses.join(', ')}</p>
      </div>
      {isOwnProfile && (
        <button className="user-card-edit-btn" onClick={() => navigate('/Userprofile')}>
          ✏️ ערוך פרופיל
        </button>
      )}
      {showChat && !isOwnProfile && (
        <button className="user-card-chat-btn" onClick={() => navigate(`/chat/${user.uid}`)}>
          💬 שלח הודעה
        </button>
      )}
    </motion.div>
  );
}

export default UserCard;
