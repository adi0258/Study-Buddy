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
    <div className="auth-page">
      <div className="auth-card">
        <GoBackButton to="/" />
        <h2 className="auth-title">התחברות 💖</h2>
        <p className="auth-subtitle">ברוכים הבאים חזרה ל Study Buddy</p>
        <div className="auth-form">
          <input
            className="auth-input"
            type="email"
            placeholder="אימייל"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="auth-input"
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-auth-primary" onClick={handleEmailLogin}>התחברות באימייל</button>
        </div>
        <div className="auth-divider"><span>או התחברו עם</span></div>
        <div className="social-buttons">
          <button className="btn-social btn-google" onClick={handleGoogleLogin}>Google</button>
          <button className="btn-social btn-facebook" onClick={handleFacebookLogin}>Facebook</button>
        </div>
        {error && <p className="auth-error">{error}</p>}
        <p className="auth-footer">אין לך חשבון? <Link to="/register">הרשמה</Link></p>
      </div>
    </div>
  );
}

export default LoginForm;
