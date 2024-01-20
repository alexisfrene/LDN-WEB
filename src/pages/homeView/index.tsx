import {
  BuildingStorefrontIcon,
  DocumentTextIcon,
  PhotoIcon,
} from '@heroicons/react/20/solid';
import { LoadedProducts } from './LoadedProducts';
import { ImageVariations } from './ImageVariations';
import { Layout, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';
import { Summary } from './Summary';
const tabButtons = [
  { title: 'Resumen', icon: <DocumentTextIcon className="h-16" /> },
  { title: 'Imágenes', icon: <PhotoIcon className="h-16" /> },
  { title: 'Productos', icon: <BuildingStorefrontIcon className="h-16" /> },
];

const HomeView = () => {
  return (
    <Layout>
      <Tabs defaultValue="Resumen" className="grid grid-cols-12 min-h-[91vh]">
        <TabsList className="col-span-1 flex flex-col h-full justify-start bg-gradient-to-t from-amber-200 to-amber-400">
          {tabButtons.map(({ title, icon }) => (
            <TabsTrigger
              value={title}
              key={title}
              className="flex flex-col bg-amber-500 w-full m-1"
            >
              {title}
              {icon}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="Resumen" className="col-span-11">
          <Summary />
        </TabsContent>
        <TabsContent value="Imágenes" className="col-span-11">
          <ImageVariations />
        </TabsContent>
        <TabsContent value="Productos" className="col-span-11">
          <LoadedProducts />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default HomeView;
