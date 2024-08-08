import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  link: string;
}

const Logo: React.FC<LogoProps> = ({ className = '', link }) => {
  return (
    <Link href={link} className={className}>
        <img src="../../logo.svg" alt="logo" />
    </Link>
  );
};

export default Logo;
