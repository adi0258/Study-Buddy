import React, { useState } from "react";
import { auth, db, storage, googleProvider } from "../firebase";
import { deleteUser, reauthenticateWithPopup, signOut } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import GoBackButton from './GoBackButton';
import '../styles/SettingsPage.css';

function SettingsPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/', { replace: true });
  };

  const handleDelete = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      await reauthenticateWithPopup(user, googleProvider);
      await deleteDoc(doc(db, "users", user.uid));
      const imageRef = ref(storage, `profileImages/${user.uid}`);
      await deleteObject(imageRef).catch((err) => {
        if (err.code !== "storage/object-not-found") throw err;
      });
      await deleteUser(user);
      alert("החשבון נמחק בהצלחה.");
      navigate("/");
    } catch (error) {
      alert("שגיאה במחיקת חשבון: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-card">
        <GoBackButton to="/home" />
        <h2>הגדרות</h2>
        <button className="logout-button" onClick={handleLogout}>🚪 התנתקות</button>
        <button className="delete-button" onClick={() => setShowConfirm(true)}>🗑️ מחיקת חשבון</button>
      </div>
      {showConfirm && (
        <div className="modal">
          <div className="modal-content">
            <p>האם אתם בטוחים שתרצו למחוק את החשבון לצמיתות?</p>
            <div className="modal-buttons">
              <button onClick={handleDelete}>כן, מחק</button>
              <button onClick={() => setShowConfirm(false)}>ביטול</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
