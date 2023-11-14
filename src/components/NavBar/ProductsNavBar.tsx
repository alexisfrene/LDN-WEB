import { Tab, Tabs, TabList } from "react-tabs";
import React, { ReactNode } from "react";
interface ProductsNavBarProps {
  tabs: string[];
  children: ReactNode;
}
export const ProductsNavBar: React.FC<ProductsNavBarProps> = ({
  children,
  tabs,
}) => {
  return (
    <Tabs>
      <TabList className="bg-amber-600 border-b-4 border-white flex justify-evenly mb-3 col-span-12">
        {tabs.map((title) => {
          return (
            <Tab
              className="border-x-2 w-full text-center py-2 cursor-pointer hover:bg-amber-500 text-lg"
              key={title}
            >
              {title}
            </Tab>
          );
        })}
      </TabList>
      {children}
    </Tabs>
  );
};
