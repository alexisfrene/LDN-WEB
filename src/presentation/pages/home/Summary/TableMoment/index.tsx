import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@components';
import { Movement } from '@src/types';

type TableMomentProps = {
  movement: Movement[] | [];
  total: number;
};

export const TableMoment: React.FC<TableMomentProps> = ({
  movement,
  total,
}) => {
  return (
    <Card className="h-full">
      <CardHeader>Historial de movimientos</CardHeader>
      <CardContent>
        <CardDescription>Últimos 10 movimientos</CardDescription>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Cantidad</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => {
              const movementItem = movement[index];
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {movementItem?.amount || ''}
                  </TableCell>
                  <TableCell>{movementItem?.description || ''}</TableCell>
                  <TableCell>{movementItem?.date || ''}</TableCell>
                  <TableCell className="text-right">
                    {movementItem?.price ? `$ ${movementItem?.price}` : '-'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">${total}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
};
