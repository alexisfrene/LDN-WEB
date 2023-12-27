import { useLoading, useSnackbar } from '@/hooks';
import { useGetAllVariantsQuery } from '@/services/products';
import { ImageVariantsProduct } from '@/types';
import { useEffect, useState } from 'react';

export const useDataFetching = () => {
  const [variationsImages, setVariationsImages] = useState<
    ImageVariantsProduct[] | []
  >([]);
  const { showErrorSnackbar } = useSnackbar();
  const { startLoading, stopLoading } = useLoading();
  const { data, error, isLoading } = useGetAllVariantsQuery(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading();
        if (error) {
          showErrorSnackbar(`Error fetching data: ${error}`);
          return;
        }
        if (data && data.data) {
          setVariationsImages(data.data);
        }
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, [
    data,
    error,
    showErrorSnackbar,
    startLoading,
    stopLoading,
    setVariationsImages,
  ]);

  // if (isLoading) {
  //   return <LoadingIndicator isLoading />;
  // }

  return { isLoading, variationsImages, setVariationsImages };
};
