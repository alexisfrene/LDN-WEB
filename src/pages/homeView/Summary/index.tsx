import { useEffect, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components';
import { addMovement, getMovement } from '@/services/finance';
import { NewMoment } from './NewMoment';
import { TableMoment } from './TableMoment';
import { AddMovementProps, Movement } from '@/types';
import { TableTotal } from './TableTotal';
import { ImportantDates } from './ImportantDates';

export const Summary: React.FC = () => {
  const [movement, setMovement] = useState<Movement[] | []>([]);
  const [total, setTotal] = useState(1);
  const fetchMovements = async () => {
    const res = await getMovement();
    if (Array.isArray(res) && res.length > 0) {
      const totalPrice = res.reduce((sum, movement) => sum + movement.price, 0);
      setTotal(totalPrice);
      return setMovement(res);
    }
  };
  const handleSubmit = async (values: AddMovementProps) => {
    const res = await addMovement(values);
    if (res) {
      fetchMovements();
    }
  };
  useEffect(() => {
    fetchMovements();
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-full rounded-lg border col-span-11"
    >
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={65} maxSize={65}>
            <TableMoment movement={movement} total={total} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={35} maxSize={35}>
            <NewMoment handleSubmit={handleSubmit} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25}>
            <TableTotal />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <ImportantDates />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
