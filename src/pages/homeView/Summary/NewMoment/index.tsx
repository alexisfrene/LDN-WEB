import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { addMovement } from '@/services/finance';
import { Form, Formik } from 'formik';
import React from 'react';
const fechaActual = new Date();

// Obtener el año, el mes y el día
const anio = fechaActual.getFullYear();
const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2); // Agregar 1 al mes porque los meses van de 0 a 11
const dia = ('0' + fechaActual.getDate()).slice(-2);

// Formatear la fecha
const fechaFormateada = anio + '-' + mes + '-' + dia;
export const NewMoment: React.FC = () => {
  const handleSubmit = async (values) => {
    await addMovement(values);
  };
  return (
    <Card className="h-full">
      <CardHeader>Cargar un movimiento:</CardHeader>
      <Formik
        initialValues={{
          description: '',
          amount: 1,
          price: 1,
          category: '',
          payment_method: 'cash',
          transaction_type: 'inflow_of_money',
          date: fechaFormateada,
        }}
        onSubmit={async (values) => {
          await handleSubmit(values);
        }}
      >
        {({
          isSubmitting,
          values,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form>
            <CardContent className="grid grid-cols-2 gap-1">
              <Label className="col-span-1">
                Nombre :
                <Input
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Label>
              <Label className="col-span-1">
                {/* <p>Seleccionar producto :</p>
                <Button variant="outline">Productos</Button> */}
                <p>Selecciona una fecha :</p>
                <Input
                  name="date"
                  type="date"
                  onChange={(e) => setFieldValue('date', e.target.value)}
                  defaultValue={fechaFormateada}
                />
              </Label>
              <div className="col-span-1 flex gap-1">
                <Label>
                  <p>Monto :</p>
                  <Input
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Label>
                <Label>
                  <p>Cantidad :</p>
                  <Input
                    type="number"
                    name="amount"
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Label>
              </div>
              <Label className="col-span-1">
                Categoría :
                <Select
                  name="category"
                  onValueChange={(e) => setFieldValue('category', e)}
                  disabled={values.payment_method === 'cash'}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona uno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categoría</SelectLabel>
                      <SelectItem value="Naranja X">Naranja X</SelectItem>
                      <SelectItem value="Mercado Pago">Mercado Pago</SelectItem>
                      <SelectItem value="Prex">Prex</SelectItem>
                      <SelectItem value="Personal Pay">Personal Pay</SelectItem>
                      <SelectItem value="Uala">Uala</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
              <div className="col-span-1">
                <Label>Método de pago :</Label>
                <RadioGroup
                  defaultValue="cash"
                  onValueChange={(e) => setFieldValue('payment_method', e)}
                  // onChange={(e) => console.log('payment_method', e)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="r1" />
                    <Label htmlFor="r1">Efectivo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="electronic_payment" id="r2" />
                    <Label htmlFor="r2">Pago electrónico</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="col-span-1">
                <Label>Tipo de movimiento :</Label>
                <RadioGroup
                  defaultValue="inflow_of_money"
                  onValueChange={(e) => setFieldValue('transaction_type', e)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="inflow_of_money" id="r1" />
                    <Label htmlFor="r1">Entrada de dinero</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="money_outflow" id="r2" />
                    <Label htmlFor="r2">Salida de dinero</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button
                className="col-span-2 mt-1"
                type="submit"
                disabled={isSubmitting}
              >
                Crear
              </Button>
            </CardContent>
          </Form>
        )}
      </Formik>
    </Card>
  );
};
