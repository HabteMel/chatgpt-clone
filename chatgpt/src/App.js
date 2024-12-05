import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';

function App() {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'chats'), orderBy('createdAt'), limit(50));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setResponses(messages);
      });
      return unsubscribe;
    }
  }, [user]);

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => console.error(error));
  };

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .catch((error) => console.error(error));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    try {
      await addDoc(collection(db, 'chats'), {
        uid: user.uid,
        text: message,
        createdAt: new Date(),
        role: 'user'
      });

      // Here you would typically call your AI service to get a response
      // For now, we'll just echo the message
      await addDoc(collection(db, 'chats'), {
        uid: user.uid,
        text: `Echo: ${message}`,
        createdAt: new Date(),
        role: 'bot'
      });

      setMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
    }
  };

  if (!user) {
    return (
      <div className="App">
        <form onSubmit={signIn}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Sign In</button>
          <button onClick={signUp}>Sign Up</button>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <section className='sideBar'>
        <nav className='sideBarNavigation'>
          <h4>My Chats</h4>
          <button onClick={() => signOut(auth)}>Sign Out</button>
        </nav>
        <ul className='chatHistory'>
          {responses.map((chat) => (
            <li key={chat.id}>
              <strong>{chat.role === 'user' ? 'User:' : 'Bot:'}</strong> {chat.text}
            </li>
          ))}
        </ul>
        <button className='newChatButton'>New Chat +</button>
      </section>

      <section className='main'>
        <h1>How can I help you today?</h1>
        <form onSubmit={handleSendMessage}>
          <input
            className='mainInput'
            placeholder='Type your question here.'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
}

export default App;

