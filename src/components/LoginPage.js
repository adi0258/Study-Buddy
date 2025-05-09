// src/components/LoginPage.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import GoBackButton from './GoBackButton';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // בודק אם מדובר בהרשמה או התחברות
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        // הרשמה
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/profile'); // שלח לדף הפרופיל אחרי הרשמה
      } else {
        // התחברות
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/home'); // שלח לדף הבית אחרי התחברות
      }
    } catch (err) {
      setError('משהו השתבש, נסה שנית');
    }
  };

  return (
    <div>
      <GoBackButton /> {/* כפתור חזרה */}
      <h2>{isSignUp ? 'הירשם' : 'התחבר'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isSignUp ? 'הרשם' : 'התחבר'}</button>
        {error && <p>{error}</p>}
      </form>
      <button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'כבר יש לך חשבון? התחבר' : 'אין לך חשבון? הירשם'}
      </button>
    </div>
  );
}

export default LoginPage;
