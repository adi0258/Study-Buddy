import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import SettingsButton from './SettingsButton';

function HomePage() {
  const navigate = useNavigate();
  const [hasProfile, setHasProfile] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, 'users', user.uid));
        setHasProfile(docSnap.exists());
        if (docSnap.exists()) setUserName(docSnap.data().name || '');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleProfileClick = () => {
    navigate(hasProfile ? `/users/${auth.currentUser.uid}` : '/Userprofile');
  };

  return (
    <div className="home-page">
      <SettingsButton />
      <div className="home-card">
        <div className="home-hero">
          <h2 className="home-title">💖 Study Buddy</h2>
          {userName && <p className="home-greeting">שלום, {userName}! 👋</p>}
          <p className="home-description">מצאו שותפים ללמידה, שתפו קורסים, ובנו קהילה לימודית תומכת</p>
        </div>
        <div className="home-actions">
          <button className="action-card" onClick={handleProfileClick}>
            <span className="action-icon">👤</span>
            <span className="action-label">הפרופיל שלי</span>
            <span className="action-arrow">←</span>
          </button>
          <button className="action-card accent" onClick={() => navigate('/discover')}>
            <span className="action-icon">🔍</span>
            <span className="action-label">גלה שותפים</span>
            <span className="action-arrow">←</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
