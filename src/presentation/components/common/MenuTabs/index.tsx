import React, { ReactNode } from 'react';
import { TabsList, Tabs, TabsTrigger, Label } from '@components';
import { cn } from '@lib';

interface Props {
  tabs: string[];
  children: ReactNode;
}

export const MenuTabs: React.FC<Props> = ({ children, tabs }) => {
  return (
    <Tabs defaultValue={tabs[0]}>
      <TabsList className={cn(['mb-3 grid', `grid-cols-${tabs.length}`])}>
        {tabs.map((title) => {
          return (
            <TabsTrigger key={title} value={title}>
              <Label className="cursor-pointer text-xl">{title}</Label>
            </TabsTrigger>
          );
        })}
      </TabsList>
      {children}
    </Tabs>
  );
};
