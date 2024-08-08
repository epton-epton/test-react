import React from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/logo';
import ButtonMenu from '@/components/ui/ButtonMenu';

const Header: React.FC = () => {
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
         <ButtonMenu link="/login">
            Login
        </ButtonMenu>  
        <ButtonMenu link="/therms">
            Therms Of Use
        </ButtonMenu> 
        <ButtonMenu link="/contacts">
            Contacts
        </ButtonMenu>   
        </nav>
      </div>
    </header>
  );
};

export default Header;
