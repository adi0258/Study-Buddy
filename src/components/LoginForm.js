// src/components/LoginForm.js
import React, { useState } from 'react';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import GoBackButton from './GoBackButton';
import '../styles/LoginForm.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleEmailLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate('/home', { replace: true }))
      .catch(err => setError(err.message));
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => navigate('/home', { replace: true }))
      .catch(err => setError(err.message));
  };

  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then(() => navigate('/home', { replace: true }))
      .catch(err => setError(err.message));
  };
  

  return (
    <div className="login-container">
      <GoBackButton to="/" />
      <h2 className="login-title">ברוכים הבאים ל<br />Study Buddy💖</h2>
      <p className="login-description">התחברו כדי להתחיל לשתף קורסים ולמצוא שותפים ללימודים.</p>
      <input
        className="login-input"
        type="email"
        placeholder="אימייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="סיסמה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleEmailLogin}>התחברות באימייל</button>
      <button className="login-button" onClick={handleGoogleLogin}>Google התחברות עם</button>
      <button className="login-button" onClick={handleFacebookLogin}>Facebook התחברות עם</button>
      {error && <p className="error">{error}</p>}

      <p className="login-text">אין לך חשבון? <Link to="/register">הרשמה באימייל</Link></p>
      
    </div>
  );
}


export default LoginForm;
