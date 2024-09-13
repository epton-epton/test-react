import React from 'react';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/auth';

const Dashboard: React.FC = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col">
      <div>Hey {session?.user.email}</div>
    </div>
  );
};

export default Dashboard;
