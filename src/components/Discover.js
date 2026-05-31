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
      if (!currentUser) return;

      const snapshot = await getDocs(collection(db, 'users'));
      const data = snapshot.docs
        .map(doc => doc.data())
        .filter(user => user.uid !== currentUser.uid); // לא להציג את המשתמש הנוכחי

      // פילטרים להתאמה - אפשר לשפר בהמשך
      const currentUserDoc = snapshot.docs.find(d => d.data().uid === currentUser.uid);
      const currentUserData = currentUserDoc?.data();
      const matchedUsers = currentUserData
        ? data.filter(user =>
            user.institution === currentUserData.institution &&
            user.faculty === currentUserData.faculty &&
            user.preference === currentUserData.preference
          )
        : data;

      setUsers(matchedUsers);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <p>טוען משתמשים מותאמים...</p>;

  return (
    <div className="discover-container">
        <GoBackButton />
      <h2 className="discover-title">שותפים מומלצים ללמידה 🎓</h2>
      <div className="cards-grid">
        {users.map((user, i) => (
          <UserCard key={i} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Discover;
