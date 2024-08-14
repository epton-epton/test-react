import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/components/ChatPopup/chatPopup.module.css';
import { useModel } from '@/components/context/ModelContext';

const ChatPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { modelName } = useModel(); // Используем модель из контекста
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<{ sender: 'You' | 'Model'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
  
    setLoading(true);
    setChatLog((prevChatLog) => [...prevChatLog, { sender: 'You', text: message }]);
  
    try {
      const response = await axios.post(
        '/api/chat',
        { message }
      );
  
      const responseData = response.data;
      const botMessage = responseData[0]?.generated_text || 'No response';
  
      setChatLog((prevChatLog) => [...prevChatLog, { sender: 'Model', text: botMessage }]);
      setMessage('');
    } catch (error) {
      console.error('Error fetching chat response:', error);
      setChatLog((prevChatLog) => [...prevChatLog, { sender: 'Model', text: 'Error fetching response' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={`${styles.popup}`}>
      <div className={`${styles.popupContent}`}>
        <button className={`${styles.closeButton}`} onClick={onClose}>×</button>
        <h2 className={`${styles.chatHeading}`}>{modelName}</h2> {/* Используем modelName из контекста */}
        <div className={`${styles.chatLog}`}>
          {chatLog.map((msg, index) => (
            <div key={index} className={`${styles.chatMessage}`}>
              <strong className={msg.sender === 'You' ? styles.senderYou : styles.senderModel}>
              {msg.sender}:</strong> {msg.text}
            </div>
          ))}
          {loading && <div>Loading...</div>}
        </div>
        <div className={`${styles.chatInput}`}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
