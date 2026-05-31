import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GoBackButton.css'; // ייבוא הקובץ CSS

function GoBackButton() {
  const navigate = useNavigate();

  return (
    <button className="go-back-button" onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')}>
      ← חזרה
    </button>
  );
}

export default GoBackButton;
