import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import UserCard from './UserCard';
import '../styles/Discover.css';
import GoBackButton from './GoBackButton';

function Discover() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const snapshot = await getDocs(collection(db, 'users'));
      const isComplete = u => u.uid && u.name && u.institution && u.faculty;
      const allUsers = snapshot.docs
        .filter(d => d.id !== currentUser.uid)
        .map(d => d.data())
        .filter(isComplete);

      const currentUserSnap = snapshot.docs.find(d => d.id === currentUser.uid);
      const currentUserData = currentUserSnap?.data();
      const others = allUsers;

      const matchedUsers = currentUserData
        ? others.filter(user =>
            user.institution === currentUserData.institution &&
            user.faculty === currentUserData.faculty
          )
        : others;

      setUsers(matchedUsers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>טוען משתמשים מותאמים...</p>;

  return (
    <div className="discover-container">
      <GoBackButton to="/home" />
      <h2 className="discover-title">שותפים מומלצים ללמידה 🎓</h2>
      {users.length === 0 ? (
        <p className="no-results">לא נמצאו שותפים ללמידה מאותו מוסד וחוג עדיין 😔</p>
      ) : (
        <div className="cards-grid">
          {users.map((user) => (
            <UserCard key={user.uid} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Discover;
