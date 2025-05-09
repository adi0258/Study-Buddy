// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // יש לשנות את היבוא מ-react-dom ל-react-dom/client
import './styles/LoginForm.css'; // ייבוא קובץ ה-CSS
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // יצירת root חדש
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
