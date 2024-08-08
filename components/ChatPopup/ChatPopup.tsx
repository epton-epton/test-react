import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/components/ChatPopup/chatPopup.module.css';

interface ChatPopupProps {
  buttonText: string;
  onClose: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ buttonText, onClose }) => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setChatLog([...chatLog, `You: ${message}`]);

    try {
      const response = await axios.post(
        'https://api.freechatgpt.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_FREECHATGPT_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage = response.data.choices[0]?.message?.content || 'No response';
      setChatLog([...chatLog, `Bot: ${botMessage}`]);
      setMessage('');
    } catch (error) {
      console.error('Error fetching chat response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.popup}`}>
      <div className={`${styles.popupContent}`}>
        <button className={`${styles.closeButton}`} onClick={onClose}>×</button>
        <h2>{buttonText}</h2>
        <div className={`${styles.chatLog}`}>
          {chatLog.map((msg, index) => (
            <div key={index} className={`${styles.chatMessage}`}>{msg}</div>
          ))}
          {loading && <div>Loading...</div>}
        </div>
        <div className={`${styles.chatInput}`}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
     
    </div>
  );
};

export default ChatPopup;
