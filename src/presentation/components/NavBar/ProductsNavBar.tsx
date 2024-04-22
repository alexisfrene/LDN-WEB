import React, { ReactNode } from 'react';
import { TabsList, Tabs, TabsTrigger, Label } from '..';
interface ProductsNavBarProps {
  tabs: string[];
  children: ReactNode;
}
export const ProductsNavBar: React.FC<ProductsNavBarProps> = ({
  children,
  tabs,
}) => {
  return (
    <Tabs defaultValue={tabs[0]}>
      <TabsList className="w-full">
        {tabs.map((title) => {
          return (
            <TabsTrigger key={title} value={title}>
              <Label className="w-96 text-xl cursor-pointer">{title}</Label>
            </TabsTrigger>
          );
        })}
      </TabsList>
      {children}
    </Tabs>
  );
};
