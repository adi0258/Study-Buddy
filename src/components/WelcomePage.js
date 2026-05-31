// src/components/WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomePage.css';
import logo from '../assets/Study_Buddy_Logo3.png';

function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <img src={logo} alt="Study Buddy Logo" className="welcome-logo" />
        <h1 className="welcome-heading">ברוכים הבאים ל Study Buddy</h1>
        <p className="welcome-description">
          אפליקציה המחברת בין סטודנטים הלומדים תחומים דומים — למצוא שותפים ללמידה ולבנות קהילה לימודית תומכת
        </p>
        <div className="welcome-buttons">
          <button className="btn-primary" onClick={() => navigate('/login')}>התחברות 🔑</button>
          <button className="btn-outline" onClick={() => navigate('/register')}>הרשמה 📝</button>
        </div>
        <ul className="welcome-features">
          <li>✨ צרו פרופיל אישי</li>
          <li>✨ הזינו קורסים שלמדתם</li>
          <li>✨ מצאו שותפי למידה לפי תחום עניין</li>
          <li>✨ קבעו מפגשי לימוד בזום או פרונטלי</li>
        </ul>
      </div>
    </div>
  );
}

export default WelcomePage;
