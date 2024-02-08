import React from 'react';
import {
  BuildingStorefrontIcon,
  DocumentTextIcon,
  PhotoIcon,
} from '@heroicons/react/20/solid';
import { Layout, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';
import { Summary } from './Summary';
import { LoadedProducts } from './LoadedProducts';
import { ImageVariations } from './ImageVariations';

const tabResumen = 'Resumen';
const tabImágenes = 'Imágenes';
const tabProductos = 'Productos';
const tabsStyles = 'sm:h-6 md:h-8 lg:h-10 xl:16';
const tabButtons = [
  {
    title: tabResumen,
    icon: <DocumentTextIcon className={tabsStyles} />,
  },
  { title: tabImágenes, icon: <PhotoIcon className={tabsStyles} /> },
  {
    title: tabProductos,
    icon: <BuildingStorefrontIcon className={tabsStyles} />,
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
      </Tabs>
    </Layout>
  );
};

export default HomeView;
