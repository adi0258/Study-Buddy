import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GoBackButton.css';

function GoBackButton({ to }) {
  const navigate = useNavigate();

  return (
    <button className="go-back-button" onClick={() => navigate(to)}>
      ← חזרה
    </button>
  );
}

export default GoBackButton;
