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
  const [filterPreference, setFilterPreference] = useState('all');
  const [filterInstitution, setFilterInstitution] = useState('same');
  const [searchName, setSearchName] = useState('');
  const [currentUserData, setCurrentUserData] = useState(null);

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
        ? others.filter(user => user.faculty === currentUserData.faculty)
        : others;

      setUsers(matchedUsers);
      setCurrentUserData(currentUserData || null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredUsers = users
    .filter(u => filterInstitution === 'all' || u.institution === currentUserData?.institution)
    .filter(u => filterPreference === 'all' || u.preference === filterPreference)
    .filter(u => !searchName || u.name?.includes(searchName));

  if (loading) return <p>טוען משתמשים מותאמים...</p>;

  return (
    <div className="discover-container">
      <GoBackButton to="/home" />
      <div className="discover-header">
        <h2 className="discover-title">שותפים מומלצים ללמידה 🎓</h2>
        <p className="discover-subtitle">מציג תוצאות לפי חוג</p>
      </div>

      <div className="discover-filters">
        <input
          className="discover-search"
          type="text"
          placeholder="🔍 חיפוש לפי שם..."
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          dir="rtl"
        />
        <div className="filter-chips">
          {[
            { value: 'same', label: '🏛️ המוסד שלי' },
            { value: 'all', label: '🌍 כל המוסדות' },
          ].map(opt => (
            <button
              key={opt.value}
              className={`filter-chip ${filterInstitution === opt.value ? 'active' : ''}`}
              onClick={() => setFilterInstitution(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="filter-chips">
          {[
            { value: 'all', label: 'הכל' },
            { value: 'zoom', label: '💻 זום' },
            { value: 'frontal', label: '🏫 פרונטלי' },
            { value: 'any', label: '🤷 לא משנה' },
          ].map(opt => (
            <button
              key={opt.value}
              className={`filter-chip ${filterPreference === opt.value ? 'active' : ''}`}
              onClick={() => setFilterPreference(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <p className="no-results">לא נמצאו שותפים ללמידה מאותו מוסד וחוג עדיין 😔</p>
      ) : (
        <div className="cards-grid">
          {filteredUsers.map((user) => (
            <UserCard key={user.uid} user={user} showChat />
          ))}
        </div>
      )}
    </div>
  );
}

export default Discover;
