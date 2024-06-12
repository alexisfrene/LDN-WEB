import React, { ReactNode } from 'react';
import { TabsList, Tabs, TabsTrigger, Label } from '@components';
interface Props {
  tabs: string[];
  children: ReactNode;
}
export const MenuTabs: React.FC<Props> = ({ children, tabs }) => {
  return (
    <Tabs defaultValue={tabs[0]}>
      <TabsList className="w-full">
        {tabs.map((title) => {
          return (
            <TabsTrigger key={title} value={title}>
              <Label className="w-96 cursor-pointer text-xl">{title}</Label>
            </TabsTrigger>
          );
        })}
      </TabsList>
      {children}
    </Tabs>
  );
};
