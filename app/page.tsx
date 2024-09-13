import React from 'react';
import Home from '@/components/Home';
import { Toaster } from 'sonner';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';

const IndexPage: React.FC = async () => {
  const session = await getServerSession(authOptions);

  /* if (session) {
    return redirect('/dashboard');
  } */

  return (
    <>
      <Home />
      <Toaster />
    </>
  );
};

export default IndexPage;
