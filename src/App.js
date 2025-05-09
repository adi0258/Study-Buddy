// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

import WelcomePage from './components/WelcomePage';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import HomePage from './components/HomePage';
import Discover from './components/Discover';
import Register from './components/Register';
import UserProfilePage from './components/UserProfilePage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // למניעת קפיצות בהתחלה

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>טוען...</div>;

  return (
    <Router>
      <Routes>
  <Route path="/" element={<WelcomePage />} />
  <Route path="/login" element={<LoginForm />} />
  <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/" />} />
  <Route path="/home" element={user ? <HomePage /> : <Navigate to="/" />} />
  <Route path="*" element={<Navigate to="/" replace />} />
  <Route path="/discover" element={<Discover />} />
  <Route path="/register" element={<Register />} />
  <Route path="/welcome" element={<WelcomePage />} />
  <Route path="/Userprofile" element={user ? <UserProfile /> : <Navigate to="/" />} />
  <Route path="/users/:uid" element={<UserProfilePage />} />

</Routes>
    </Router>
  );
}


export default App;
