import React, { ReactNode, useEffect } from 'react';
import logo from '@assets/favicon.png';
import { Avatar, AvatarFallback, AvatarImage } from '@components';
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
    insertAvatar(res);
  };

  useEffect(() => {
    if (session_token && !avatar) {
      getAvatarImage();
    }
  }, []);
  return (
    <>
      <div className="flex h-[9vh] justify-between bg-gradient-to-t from-amber-200 to-amber-400 p-1">
        <img
          src={logo}
          className="max-h-[9vh] object-scale-down lg:ml-6"
          loading="lazy"
          alt="logo-ldn"
        />
        {session_token && (
          <Avatar className="mx-5 my-2">
            <AvatarImage src={avatar} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
      </div>
      {children}
    </>
  );
};
