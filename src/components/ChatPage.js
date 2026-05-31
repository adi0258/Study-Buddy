import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/ChatPage.css';

const getChatId = (uid1, uid2) => [uid1, uid2].sort().join('_');

function ChatPage() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerPhoto, setPartnerPhoto] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let unsubscribeMessages = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      setCurrentUser(user);

      const partnerDoc = await getDoc(doc(db, 'users', uid));
      if (partnerDoc.exists()) {
        setPartnerName(partnerDoc.data().name || '');
        setPartnerPhoto(partnerDoc.data().photoURL || '');
      }

      const chatId = getChatId(user.uid, uid);
      const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt', 'asc'));
      unsubscribeMessages = onSnapshot(q, snapshot => {
        setMessages(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeMessages) unsubscribeMessages();
    };
  }, [uid]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !currentUser) return;
    const chatId = getChatId(currentUser.uid, uid);
    const text = newMessage.trim();
    await addDoc(collection(db, 'chats', chatId, 'messages'), {
      text,
      senderId: currentUser.uid,
      createdAt: serverTimestamp(),
    });
    await setDoc(doc(db, 'chats', chatId), {
      participants: [currentUser.uid, uid].sort(),
      lastMessage: text,
      updatedAt: serverTimestamp(),
    }, { merge: true });
    setNewMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <button className="chat-back-btn" onClick={() => navigate('/discover')}>← חזרה</button>
        {partnerPhoto ? (
          <img src={partnerPhoto} alt={partnerName} className="chat-partner-photo" />
        ) : (
          <div className="chat-partner-photo-placeholder">{partnerName?.charAt(0) || '?'}</div>
        )}
        <span className="chat-partner-name">{partnerName}</span>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <p className="chat-empty">אין הודעות עדיין. שלחו הודעה ראשונה! 👋</p>
        )}
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`chat-bubble ${msg.senderId === currentUser?.uid ? 'own' : 'other'}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-row">
        <button className="chat-send-btn" onClick={handleSend}>שלח</button>
        <input
          className="chat-input"
          type="text"
          placeholder="כתבו הודעה..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          dir="rtl"
        />
      </div>
    </div>
  );
}

export default ChatPage;
