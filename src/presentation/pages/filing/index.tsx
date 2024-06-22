import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStore } from '@global';
import {
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
  const sessionToken = useSessionStore((state) => state.session_token);
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
                Estas loqueado !
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
