import React, { useState } from 'react';
import ChatPopup from '@/components/ChatPopup/ChatPopup';

interface ChatButtonProps {
  modelNameChat: string;
}

const ChatButton: React.FC<ChatButtonProps> = ({ modelNameChat }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button 
        className="bg-white text-black py-2 px-4 rounded absolute top-3 left-3"
        onClick={() => setIsOpen(true)}>
        Start chat
      </button>
      {isOpen && (
        <ChatPopup buttonText={modelNameChat} onClose={() => setIsOpen(false)} />
      )}
      <style jsx>{`
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .popup-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          width: 400px;
          max-width: 100%;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          position: relative;
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ChatButton;
