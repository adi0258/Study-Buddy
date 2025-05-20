import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import UserCard from './UserCard';
import '../styles/Discover.css';
import GoBackButton from './GoBackButton';

function Discover() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error('No authenticated user found.');
        setLoading(false);
        return;
      }

      try {
        // Fetch all users from Firestore
        const snapshot = await getDocs(collection(db, 'users'));
        const allUsers = snapshot.docs.map(doc => doc.data());

        // Find the current user's data
        const currentUserData = allUsers.find(user => user.uid === currentUser.uid);
        if (!currentUserData) {
          console.error('Current user data not found in Firestore.');
          setLoading(false);
          return;
        }

        // Filter users based on shared courses and preferences
        const matchedUsers = allUsers.filter(user => {
          if (user.uid === currentUser.uid) return false; // Exclude the current user

          // Check if there are shared courses
          const sharedCourses = user.courses.some(course => currentUserData.courses.includes(course));

          // Check if preferences match
          const preferenceMatch = user.preference === currentUserData.preference || user.preference === 'any';

          return sharedCourses && preferenceMatch;
        });

        setUsers(matchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>טוען משתמשים מותאמים...</p>;

  return (
    <div className="discover-container">
      <GoBackButton />
      <h2 className="discover-title">שותפים מומלצים ללמידה 🎓</h2>
      <div className="cards-grid">
        {users.length > 0 ? (
          users.map((user, i) => <UserCard key={i} user={user} />)
        ) : (
          <p>לא נמצאו שותפים מתאימים.</p>
        )}
      </div>
    </div>
  );
}

export default Discover;
