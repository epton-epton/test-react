'use client'; 

import React, { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { ref, onValue } from 'firebase/database';
import { db } from '@/firebaseConfig'; 
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import Link from 'next/link';

const Dashboard: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [dialogs, setDialogs] = useState<any[]>([]);
  const [selectedDialog, setSelectedDialog] = useState<any[]>([]); 

  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession(); 
      setSession(session);

      if (session?.user?.email) {
        const userEmail = session.user.email.replace(/\./g, ','); 

        // Получаем ссылки на диалоги в Firebase
        const dialogsRef = ref(db, `dialogs/${userEmail}`);
        onValue(dialogsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const dialogList = Object.entries(data).map(([id, dialog]) => ({
              id,
              date: new Date(Number(id)).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false, 
              }),
              dialog,
            }));
            setDialogs(dialogList);
          }
        });
      }
    };

    loadSession();
  }, []);

  const handleDialogClick = (dialog: any) => {
    setSelectedDialog(dialog.chatLog);
  };

  return (
    <div className="container mx-auto flex flex-wrap space-y-3 items-center">
      <div className="flex flex-col w-full">
        {session ? (
          <>
            <div className="flex justify-start items-center gap-5">
              <div>Hey {session.user.email}</div>
              <div>
                <LogoutButton />
              </div>
            </div>
            <div className="flex justify-start items-top gap-10">
              <div className="mt-8">
              <h2 className='text-[22px] font-bold'>Your Saved Dialogs</h2>
                {dialogs.length > 0 ? (
                  <ul>
                    {dialogs.map((dialog) => (
                      <li key={dialog.id}>
                        <Link href="#" onClick={() => handleDialogClick(dialog.dialog)}>
                          {dialog.date}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No dialogs saved yet.</p>
                )}
              </div>

              {selectedDialog && selectedDialog.length > 0 && ( 
                <div className="mt-8">
                  <h2 className='text-[22px] font-bold'>Selected Dialog</h2>
                  <div>
                    {selectedDialog.map((message: any, index: number) => (
                      <div key={index}>
                        <strong>{message.sender}:</strong> {message.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div>Please log in to view your dialogs.</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
