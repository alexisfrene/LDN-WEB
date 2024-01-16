import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Select,
  Label,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/components';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { addMovement } from '@/services/finance';
import { useEffect } from 'react';
import { NewMoment } from './NewMoment';
import { TableMoment } from './TableMoment';

export const Summary: React.FC = () => {
  // useEffect(() => console.log(addMovement()), []);
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-full rounded-lg border col-span-11"
    >
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={65} maxSize={65}>
            <TableMoment />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={35} maxSize={35}>
            <NewMoment />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
