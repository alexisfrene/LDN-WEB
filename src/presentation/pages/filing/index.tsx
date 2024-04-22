import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@global';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Layout,
} from '@components';

const Filing: React.FC = () => {
  const navigate = useNavigate();
  const sessionToken = useUserStore((state) => state.session_token);
  const username = useUserStore((state) => state.username);
  const avatar_url = useUserStore((state) => state.avatar_url);
  return (
    <Layout>
      <Card className="my-10 mx-48">
        <CardHeader>
          <CardTitle className="text-center">Acción a realizar </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-10 justify-center">
          {!sessionToken ? (
            <>
              <div className="w-96 h-40 border-2 flex flex-col justify-center px-14 hover:bg-slate-100 cursor-pointer">
                <CardDescription className="text-center my-3">
                  Crear una cuenta
                </CardDescription>
                <Button onClick={() => navigate('/signup')}>Registrarme</Button>
              </div>
              <div className="w-96 h-40 border-2 flex flex-col justify-center px-14 hover:bg-slate-100 cursor-pointer">
                <CardDescription className="text-center my-3">
                  Iniciar sesión
                </CardDescription>
                <Button onClick={() => navigate('/login')}>Login</Button>
              </div>
            </>
          ) : (
            <div className="w-96 h-40 border-2 flex flex-col justify-center px-14 hover:bg-slate-100 cursor-pointer">
              <CardDescription>Estas logueado con el usuario :</CardDescription>
              <div className="text-blue-600 p-3 font-bold text-lg bg-slate-200 text-center m-3 flex gap-5">
                <Avatar>
                  <AvatarImage src={avatar_url} alt="@ldn-avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle>{username}</CardTitle>
              </div>
              <Button onClick={() => navigate('/home')}>
                Ir a la <span className="text-blue-600 p-3">Home</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Filing;
