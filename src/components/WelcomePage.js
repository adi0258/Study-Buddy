// src/components/WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/WelcomePage.css';
import logo from '../assets/Study_Buddy_Logo3.png';
function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
        
      <h1>ברוכים הבאים ל</h1>
      <img src={logo} alt="Study Buddy Logo" className="welcome-logo" />
      <p className="welcome-description">
         אפליקציה המחברת בין סטודנטיות וסטודנטים הלומדים תחומים דומים<br />
        כדי למצוא שותפים ללמידה, ולבנות קהילה לימודית תומכת!
      </p>
      <div className="welcome-buttons">
        <button onClick={() => navigate('/login')}>התחברות 🔑</button>
        <button onClick={() => navigate('/register')}>הרשמה 📝</button>
      </div>
      <p className="welcome-features">
        ✨ צרו פרופיל אישי<br />
        ✨ הזינו קורסים שלמדתם<br />
        ✨ מצאו בקלות שותפי למידה לפי תחומי עניין והעדפות<br />
        ✨ קבעו מפגשי לימוד פרונטליים או בזום
      </p>
      
    </div>
  );
}

export default WelcomePage;
