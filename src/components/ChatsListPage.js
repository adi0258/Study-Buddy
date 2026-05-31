import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import GoBackButton from './GoBackButton';
import '../styles/ChatsListPage.css';

function ChatsListPage() {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeChats = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const q = query(
        collection(db, 'chats'),
        where('participants', 'array-contains', user.uid)
      );

      unsubscribeChats = onSnapshot(q, async (snapshot) => {
        const chatDocs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

        const enriched = await Promise.all(
          chatDocs.map(async (chat) => {
            const partnerUid = chat.participants.find(p => p !== user.uid);
            const partnerDoc = await getDoc(doc(db, 'users', partnerUid));
            const partner = partnerDoc.exists() ? partnerDoc.data() : null;
            return { ...chat, partnerUid, partner };
          })
        );

        enriched.sort((a, b) => (b.updatedAt?.seconds || 0) - (a.updatedAt?.seconds || 0));
        setChats(enriched);
        setLoading(false);
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeChats) unsubscribeChats();
    };
  }, []);

  if (loading) return <p className="chats-loading">טוען שיחות...</p>;

  return (
    <div className="chats-list-page">
      <GoBackButton to="/home" />
      <h2 className="chats-list-title">💬 השיחות שלי</h2>

      {chats.length === 0 ? (
        <p className="chats-empty">אין שיחות עדיין. התחילו לשלוח הודעות מדף גלה שותפים!</p>
      ) : (
        <div className="chats-list">
          {chats.map(chat => (
            <button
              key={chat.id}
              className="chat-list-item"
              onClick={() => navigate(`/chat/${chat.partnerUid}`)}
            >
              {chat.partner?.photoURL ? (
                <img src={chat.partner.photoURL} alt={chat.partner.name} className="chat-list-photo" />
              ) : (
                <div className="chat-list-photo-placeholder">
                  {chat.partner?.name?.charAt(0) || '?'}
                </div>
              )}
              <div className="chat-list-info">
                <span className="chat-list-name">{chat.partner?.name || 'משתמש לא ידוע'}</span>
                <span className="chat-list-last">{chat.lastMessage}</span>
              </div>
              <span className="chat-list-arrow">←</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ChatsListPage;
