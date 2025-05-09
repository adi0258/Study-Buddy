import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GoBackButton.css'; // ייבוא הקובץ CSS

function GoBackButton() {
  const navigate = useNavigate();

  return (
    <button className="go-back-button" onClick={() => navigate(-1)}>
      חזרה→
    </button>
  );
}

export default GoBackButton;
