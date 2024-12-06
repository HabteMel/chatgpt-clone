import React, { useState } from 'react';
import axios from 'axios';

const Chat = ({ token }) => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/chat',
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponse(res.data.botMessage);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Sorry, something went wrong.');
    }
  };

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSubmit}>Send</button>
      <div>{response}</div>
    </div>
  );
};

export default Chat;
