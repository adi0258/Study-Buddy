import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SettingsButton.css'; // ייבוא הקובץ CSS

function SettingsButton() {
  const navigate = useNavigate();

  return (
    <button className="settings-button" onClick={() => navigate('/settings')}>
      ⚙️
    </button>
  );
}

export default SettingsButton;
