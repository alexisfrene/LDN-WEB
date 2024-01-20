import React, { ReactNode } from 'react';
import logo from '../../../assets/favicon.png';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="bg-gradient-to-t from-amber-200 to-amber-400 p-1 h-[9vh]">
        <img src={logo} className="max-h-[9vh] lg:ml-6 object-scale-down" loading="lazy" alt="logo-ldn" />
      </div>
      {children}
    </>
  );
};
