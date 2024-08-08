import React from 'react';

interface ButtonProps {
  className?: string;
  link: string;
  children: React.ReactNode; 
}

const ButtonMenu: React.FC<ButtonProps> = ({ className = '', link, children }) => {
  return (
    <a href={link}
        className={`hover:bg-neutral-300 border-solid border-2 border-neutral-500 text-black py-1 px-2 rounded-xl text-sm font-semibold ml-2 bg-white${className}`}>
        {children}
    </a>

  );
};

export default ButtonMenu;
