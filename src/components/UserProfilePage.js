import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import UserCard from './UserCard';
import '../styles/UserProfilePage.css'; // ייבוא הקובץ CSS
import GoBackButton from './GoBackButton'; // ייבוא כפתור חזרה

function UserProfilePage() {
  const { uid } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    fetchUser();
  }, [uid]);

  if (!userData) return <div>...טוען פרופיל</div>;

  return (
    <div className="user-profile-container">
        <GoBackButton /> {/* כפתור חזרה */}
      <UserCard user={userData} />
    </div>
  );
}

export default UserProfilePage;
