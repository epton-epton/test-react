// components/Home.tsx
'use client';

import React, { useState } from 'react';
import FormReg from '@/components/FormReg';
import FormLogin from '@/components/FormLogin';
import Logout from '@/components/Logout';
import ButtonDefault from '@/components/ui/ButtonDefault';
import { SessionProvider } from 'next-auth/react'; 

const Home: React.FC = () => {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showReg, setShowReg] = useState<boolean>(false);

  const handleButtonClick1 = () => {
    setShowLogin(true);
    setShowReg(false);
  };

  const handleButtonClick2 = () => {
    setShowLogin(false);
    setShowReg(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Login / Registration</h1>

      <div className="space-x-4">
        <ButtonDefault className="bg-blue-500" onClick={handleButtonClick1}>
          Login
        </ButtonDefault>
        <ButtonDefault className="bg-green-500" onClick={handleButtonClick2}>
          Registration
        </ButtonDefault>
      </div>

      {showLogin && <div className="mt-4 bg-gray-200 p-4 rounded"><FormLogin /></div>}
      {showReg && <div className="mt-4 bg-gray-200 p-4 rounded"><FormReg /></div>}
    </div>
  );
};

export default Home;