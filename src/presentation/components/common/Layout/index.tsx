import React, { ReactNode, useEffect } from 'react';
import logo from '@assets/favicon.png';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui';
import { useSessionStore } from '@global';
import { getUrlAvatar } from '@src/services';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const insertAvatar = useSessionStore((state) => state.insertAvatar);
  const avatar = useSessionStore((state) => state.avatar);
  const session_token = useSessionStore((state) => state.session_token);
  const getAvatarImage = async () => {
    const res = await getUrlAvatar();
    insertAvatar({ avatar: res, session_token });
  };

  useEffect(() => {
    getAvatarImage();
  }, []);
  return (
    <>
      <div className="bg-gradient-to-t from-amber-200 to-amber-400 p-1 h-[9vh] flex justify-between">
        <img
          src={logo}
          className="max-h-[9vh] lg:ml-6 object-scale-down"
          loading="lazy"
          alt="logo-ldn"
        />
        <Avatar className="my-2 mx-5">
          <AvatarImage src={avatar} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      {children}
    </>
  );
};
