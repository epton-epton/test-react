'use client'; 

import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(); 
    router.push('/'); 
  };

  return (
    <button onClick={handleLogout} className="hover:bg-neutral-300 border-solid border-2 border-neutral-500 text-black py-1 px-2 rounded-xl text-sm font-semibold ml-2 bg-white">
      Logout
    </button>
  );
};

export default LogoutButton;
