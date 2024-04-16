import React, { useState } from 'react';
import { toast } from 'sonner';
import { InfoSection } from './InfoSection';
import { CardDescription, LoadingIndicator } from '@/components';
import { editDetailsImageVariations } from '@/services';
import { ImageVariantsProduct } from '@/types';

type InfoDetailsProps = {
  productSelected: ImageVariantsProduct;
  refresh: () => void;
};
export const InfoDetails: React.FC<InfoDetailsProps> = ({
  productSelected,
  refresh,
}) => {
  const [loading, setLoading] = useState(false);
  const { id, details } = productSelected;
  const handleSubmit = async (type: string, value: string) => {
    setLoading(true);
    const data = await editDetailsImageVariations({
      type,
      value,
      id,
    });
    if (data) {
      refresh();
      toast(`Detalle editado : ${type}`);
    }
    setLoading(false);
  };
  const infoSectionsData = [
    { label: 'Color', value: details.color, type: 'color' },
    { label: 'Marca', value: details.brand, type: 'brand' },
    { label: 'Genero', value: details.gender, type: 'gender' },
    { label: 'Estilo', value: details.style, type: 'style' },
  ];

  return (
    <>
      <CardDescription>Detalles de las imágenes : </CardDescription>
      {infoSectionsData.map((infoSection) => (
        <InfoSection
          key={infoSection.type}
          label={infoSection.label}
          value={infoSection.value}
          onSubmit={(value) => handleSubmit(infoSection.type, value)}
        />
      ))}
      <LoadingIndicator isLoading={loading} />
    </>
  );
};
