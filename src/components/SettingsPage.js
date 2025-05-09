import React, { useState } from "react";
import { auth, db, storage, googleProvider } from "../firebase";
import { deleteUser, reauthenticateWithPopup } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import GoBackButton from './GoBackButton';

function SettingsPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      // אימות מחדש (דרוש לחשבונות Google)
      await reauthenticateWithPopup(user, googleProvider);

      // מחיקת נתוני Firestore
      await deleteDoc(doc(db, "users", user.uid));

      // מחיקת תמונת פרופיל
      const imageRef = ref(storage, `profileImages/${user.uid}.jpg`);
      await deleteObject(imageRef).catch((err) => {
        if (err.code !== "storage/object-not-found") throw err;
      });

      // מחיקת המשתמש
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
        <GoBackButton /> {/* כפתור חזרה */}
      <h2>הגדרות</h2>
      <button className="delete-button" onClick={() => setShowConfirm(true)}>
        🗑️ מחיקת חשבון
      </button>

      {showConfirm && (
        <div className="modal">
          <div className="modal-content">
            <p>האם את בטוחה שתרצי למחוק את החשבון לצמיתות?</p>
            <div className="modal-buttons">
              <button onClick={handleDelete}>כן, מחקי</button>
              <button onClick={() => setShowConfirm(false)}>ביטול</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
