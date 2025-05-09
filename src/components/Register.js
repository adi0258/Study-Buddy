import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'; // ייבוא הקובץ CSS
import './GoBackButton'; // ייבוא כפתור חזרה
import GoBackButton from './GoBackButton';
function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('❌ הסיסמאות אינן תואמות');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('✅ נרשמת בהצלחה!');
      setTimeout(() => navigate('/profile'), 1500);
    } catch (error) {
      setMessage('❌ שגיאה בהרשמה: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <GoBackButton />
      <h2>הרשמה</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="אישור סיסמה"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">הרשמה</button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}

export default Register;
