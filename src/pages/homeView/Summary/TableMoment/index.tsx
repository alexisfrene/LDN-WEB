import { Card, CardContent, CardHeader } from '@/components';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getMovement } from '@/services/finance';
import React, { useEffect, useState } from 'react';

export const TableMoment: React.FC = () => {
  const [movement, setMovement] = useState([]);
  const ff = async () => {
    const res = await getMovement();

    return setMovement(res);
  };
  useEffect(() => {
    ff();
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>Últimos movimientos</CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Cantidad</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movement?.map((movement) => (
              <TableRow key={movement.id}>
                <TableCell className="font-medium">{movement.amount}</TableCell>
                <TableCell>{movement.description}</TableCell>
                <TableCell>{movement.date}</TableCell>
                <TableCell className="text-right">
                  {'$ ' + movement.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};
