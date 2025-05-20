// src/components/LoginForm.js
import React, { useState } from 'react';
import { auth, googleProvider, facebookProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import GoBackButton from './GoBackButton';
import { Link } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaEnvelope } from 'react-icons/fa'; // Import icons

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate('/home'))
      .catch(err => setError(err.message));
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => navigate('/home'))
      .catch(err => setError(err.message));
  };

  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then(() => navigate('/home'))
      .catch(err => setError(err.message));
  };

  return (
    <div className="login-container">
      <GoBackButton />
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
      <div className="login-buttons-container">
        <button className="login-button" onClick={handleEmailLogin}>
          <FaEnvelope className="login-logo" /> 
        </button>
        <button className="login-button" onClick={handleGoogleLogin}>
          <FaGoogle className="login-logo" /> 
        </button>
        <button className="login-button" onClick={handleFacebookLogin}>
          <FaFacebook className="login-logo" />
        </button>
      </div>
      {error && <p className="error">{error}</p>}

      <p className="login-text">אין לך חשבון? <Link to="/register">הרשמה באימייל</Link></p>
    </div>
  );
}

export default LoginForm;
