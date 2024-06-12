import React from 'react';
import {
  Icons,
  Layout,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@components';
import { Summary } from './Summary';
import { Products } from './Products';
import { Variations } from './Variations';
import { Config } from './Config';

const tabResumen = 'Resumen';
const tabImágenes = 'Imágenes';
const tabProductos = 'Productos';
const tabConfig = 'Ajustes';
const tabsStyles = 'sm:h-6 md:h-8 lg:h-10 xl:16';
const tabButtons = [
  {
    title: tabResumen,
    icon: <Icons type="document" className={tabsStyles} />,
  },
  { title: tabImágenes, icon: <Icons type="photo" className={tabsStyles} /> },
  {
    title: tabProductos,
    icon: <Icons type="store" className={tabsStyles} />,
  },
  {
    title: tabConfig,
    icon: <Icons type="cog_6_tooth" className={tabsStyles} />,
  },
];

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Tabs
        defaultValue={tabResumen}
        className="grid min-h-[91vh] grid-cols-12"
      >
        <TabsList className="col-span-1 flex h-full flex-col justify-start gap-2 bg-gradient-to-t from-amber-200 to-amber-400">
          {tabButtons.map(({ title, icon }) => (
            <TabsTrigger
              value={title}
              key={title}
              className="flex w-full flex-col bg-amber-500"
            >
              {title}
              {icon}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={tabResumen} className="col-span-11">
          <Summary />
        </TabsContent>
        <TabsContent value={tabImágenes} className="col-span-11">
          <Variations />
        </TabsContent>
        <TabsContent value={tabProductos} className="col-span-11">
          <Products />
        </TabsContent>
        <TabsContent value={tabConfig} className="col-span-11">
          <Config />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default HomePage;
