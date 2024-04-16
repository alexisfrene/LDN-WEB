import { useUserStore } from '@/global';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const WithAuth: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.session_token);
  useEffect(() => {
    if (!token || token.length === 0) {
      setTimeout(() => navigate('/'), 2000);
    }
  }, [token]);

  if (!token || token.length === 0) {
    return <div>Error no estas logueado</div>; //TODO:Mejorar es msj error
  }
  return children;
};
