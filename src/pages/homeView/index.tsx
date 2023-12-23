import { BuildingStorefrontIcon, PhotoIcon } from '@heroicons/react/20/solid';
import { LoadedProducts } from './LoadedProducts';
import { ImageVariations } from './ImageVariations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';
import logo from '../../../public/favicon.png';

const tabButtons = [
  { title: 'Imagenes', icon: <PhotoIcon className="h-16" /> },
  { title: 'Productos', icon: <BuildingStorefrontIcon className="h-16" /> },
];

const HomeView = () => {
  return (
    <Tabs defaultValue="Imagenes" className="grid grid-cols-12">
      <div className="bg-gradient-to-t from-amber-200 to-amber-400 h-20 p-1 mt-[-5px] col-span-12">
        <img src={logo} className="w-20 ml-6" loading="lazy" alt="logo-ldn" />
      </div>
      <TabsList className="col-span-1 flex flex-col min-h-screen h-full justify-start bg-gradient-to-t from-amber-200 to-amber-400">
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

      <TabsContent value="Imagenes" className="col-span-11">
        <ImageVariations />
      </TabsContent>
      <TabsContent value="Productos" className="col-span-11">
        <LoadedProducts />
      </TabsContent>
    </Tabs>
  );
};

export default HomeView;
