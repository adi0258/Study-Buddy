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
import SettingsPage from './components/SettingsPage';
import ChatPage from './components/ChatPage';
import ChatsListPage from './components/ChatsListPage';


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
  <Route path="/welcome" element={<WelcomePage />} />
  <Route path="/login" element={<LoginForm />} />
  <Route path="/register" element={<Register />} />
  <Route path="/home" element={user ? <HomePage /> : <Navigate to="/" />} />
  <Route path="/profile" element={user ? <UserProfile /> : <Navigate to="/" />} />
  <Route path="/Userprofile" element={user ? <UserProfile /> : <Navigate to="/" />} />
  <Route path="/users/:uid" element={<UserProfilePage />} />
  <Route path="/discover" element={<Discover />} />
  <Route path="/settings" element={<SettingsPage />} />
  <Route path="/chat/:uid" element={user ? <ChatPage /> : <Navigate to="/" />} />
  <Route path="/chats" element={user ? <ChatsListPage /> : <Navigate to="/" />} />
  <Route path="*" element={<Navigate to="/" replace />} />


</Routes>
    </Router>
  );
}


export default App;
