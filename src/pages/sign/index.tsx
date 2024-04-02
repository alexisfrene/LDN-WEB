import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Input,
  Label,
  Layout,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { useFormik } from 'formik';
import React from 'react';
//import { z } from 'zod';

const SingUpPage: React.FC = () => {
  const initialValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordConfirm: '',
    gender: '',
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (values.password === values.passwordConfirm) {
        alert(JSON.stringify(values, null, 2));
      }
    },
  });
  return (
    <Layout>
      <Card className="mx-20 mt-10">
        <CardHeader className="text-center">Crea una cuenta Gratis</CardHeader>
        <CardDescription className="text-center">
          ¿Ya tienes cuenta?
          <b className="text-blue-600">Ingresa desde aquí.</b>
        </CardDescription>
        <CardContent className="grid grid-cols-2 gap-1 m-10">
          <form onSubmit={formik.handleSubmit}>
            <Label htmlFor="name">
              Nombre
              <Input
                name="name"
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder="Ingrese su nombre"
                minLength={3}
                maxLength={15}
              />
            </Label>
            <Label htmlFor="surname">
              Apellido
              <Input
                name="surname"
                id="surname"
                onChange={formik.handleChange}
                value={formik.values.surname}
                placeholder="Ingrese su apellido"
                minLength={3}
                maxLength={15}
              />
            </Label>
            <Label htmlFor="email" className="col-span-2">
              Email
              <Input
                name="email" //TODO: ver como validar que este no se repita
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="juanperez@gmail.com"
                type="email"
                minLength={3}
                maxLength={50}
              />
            </Label>
            <Label htmlFor="gender" className="col-span-2">
              Genero
              <Select
                name="gender"
                onValueChange={(value) => formik.setFieldValue('gender', value)}
                value={formik.values.gender}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Géneros</SelectLabel>
                    <SelectItem value="male">Hombre</SelectItem>
                    <SelectItem value="female">Mujer</SelectItem>
                    <SelectItem value="unspecified">No especificar</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Label>
            <Label className="col-span-2" htmlFor="password">
              Contraseña
              <Input
                name="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                minLength={3}
                maxLength={50}
              />
            </Label>
            <Label className="col-span-2">
              Confirmar contraseña
              <Input
                name="passwordConfirm"
                id="passwordConfirm"
                onChange={formik.handleChange}
                value={formik.values.passwordConfirm}
                type="password"
                minLength={3}
                maxLength={50}
              />
            </Label>
            <Button
              className="col-span-2 mt-5"
              type="submit"
              disabled={
                !(
                  formik.values.password === formik.values.passwordConfirm &&
                  formik.values.gender
                )
              }
            >
              Registrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default SingUpPage;
