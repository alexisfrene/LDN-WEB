import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { BuildingStorefrontIcon, PhotoIcon } from '@heroicons/react/20/solid';
import { LoadedProducts } from './LoadedProducts';
import { ImageVariations } from './ImageVariations';

const tabButtons = [
  { title: 'Imagenes', icon: <PhotoIcon className="h-16" /> },
  { title: 'Productos', icon: <BuildingStorefrontIcon className="h-16" /> },
];

const HomeView = () => {
  return (
    <Tabs className="grid grid-cols-12 grid-rows-6">
      <TabList className="bg-gradient-to-br from-orange-100 to-orange-400 col-span-1 row-span-6 min-h-screen">
        {tabButtons.map(({ title, icon }) => (
          <Tab
            className="h-20 bg-gradient-to-b from-orange-150 to-orange-450 m-0.5 rounded-xl cursor-pointer flex flex-col justify-center"
            key={title}
          >
            <p className="text-center text-lg mt-1">{title}</p>
            {icon}
          </Tab>
        ))}
      </TabList>
      <div className="col-span-11 row-span-6">
        <TabPanel>
          <ImageVariations />
        </TabPanel>
        <TabPanel>
          <LoadedProducts />
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default HomeView;
