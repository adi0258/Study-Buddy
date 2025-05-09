import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/HomePage.css';
import GoBackButton from './GoBackButton';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import SettingsButton from './SettingsButton';



function HomePage() {
  const navigate = useNavigate();
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        setHasProfile(docSnap.exists());
      }
    });
  
    return () => unsubscribe();
  }, []);

  const handleProfileClick = () => {
    if (hasProfile) {
      navigate(`/users/${auth.currentUser.uid}`);
    } else {
      navigate('/Userprofile');
    }
  };
  const handleDiscoverClick = () => {
    navigate('/discover');
  }
  
  return (
    <div className="home-container">
      <SettingsButton />
      <GoBackButton />
      <h2 className="home-title">💖Study Buddy💖</h2>
      <p className="home-description">
        כאן תוכלו להתחבר עם סטודנטים, לשתף קורסים ולבנות פרופיל אישי.
      </p>
      <button className="home-button" onClick={handleProfileClick}>
        לפרופיל שלי
      </button>
      <button className="discover-button" onClick={handleDiscoverClick}>גלה שותפים🔍</button>
    </div>
  );
}

export default HomePage;
