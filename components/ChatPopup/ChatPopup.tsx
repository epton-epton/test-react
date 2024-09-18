import React, { useState } from 'react';
import axios from 'axios';
import { ref, set } from 'firebase/database';
import { db } from '@/firebaseConfig'; 
import styles from '@/components/ChatPopup/chatPopup.module.css';
import { useModel } from '@/components/context/ModelContext';
import { useSession } from 'next-auth/react'; // Для получения сессии
import { toast } from 'sonner';

const ChatPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { modelName } = useModel();
  const { data: session } = useSession(); 
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

  const handleSaveDialog = async (chatLog: any[], session: any) => {
    if (!session || !session.user || !session.user.email) {
      console.error('No session or email found');
      return;
    }
  
    const userEmail = session.user.email.replace(/\./g, ','); 
    const timestamp = Date.now(); 
  
    try {
      const dialogRef = ref(db, `dialogs/${userEmail}/${timestamp}`);
      await set(dialogRef, { chatLog, timestamp });
      toast.success('Dialog saved successfully');
    } catch (error) {
      toast.error('Error saving dialog');
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
        <h2 className={`${styles.chatHeading}`}>{modelName}</h2>
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
        {session?.user?.email && (
          <button
            onClick={() => handleSaveDialog(chatLog, session)} // Передаём аргументы через анонимную функцию
            className="mt-2 bg-blue-500 text-white p-2"
          >
            Save dialog
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatPopup;
