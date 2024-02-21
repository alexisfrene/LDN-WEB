import React from 'react';
import {
  Icons,
  Layout,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components';
import { Summary } from './Summary';
import { LoadedProducts } from './LoadedProducts';
import { ImageVariations } from './ImageVariations';
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

const HomeView: React.FC = () => {
  return (
    <Layout>
      <Tabs
        defaultValue={tabResumen}
        className="grid grid-cols-12 min-h-[91vh]"
      >
        <TabsList className="col-span-1 flex flex-col h-full justify-start bg-gradient-to-t from-amber-200 to-amber-400 gap-2">
          {tabButtons.map(({ title, icon }) => (
            <TabsTrigger
              value={title}
              key={title}
              className="flex flex-col bg-amber-500 w-full"
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
          <ImageVariations />
        </TabsContent>
        <TabsContent value={tabProductos} className="col-span-11">
          <LoadedProducts />
        </TabsContent>
        <TabsContent value={tabConfig} className="col-span-11">
          <Config />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default HomeView;
