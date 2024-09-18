import React from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/logo';
import ButtonMenu from '@/components/ui/ButtonMenu';
import { getServerSession } from 'next-auth'; 
import authOptions from '@/lib/auth';

const Header: React.FC = async () => {
  const session = await getServerSession(authOptions); 

  return (
    <header className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white w-[200px]">
          <Logo link="/" />
        </div>
        <nav>
          <ButtonMenu link="/">
            Home
          </ButtonMenu>
          <ButtonMenu link="/therms">
            Terms Of Use
          </ButtonMenu>
          <ButtonMenu link="/contacts">
            Contacts
          </ButtonMenu>
          {session && (
            <>
              <ButtonMenu link="/dashboard">
                Profile
              </ButtonMenu>
            </>
          )}
          {!session && (
            <ButtonMenu link="/login">
              Login
            </ButtonMenu>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
