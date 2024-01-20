import { useEffect, useState } from 'react';
import { useLoading, useSnackbar } from '@/hooks';
import { useGetAllVariantsQuery } from '@/services';
import { ImageVariantsProduct } from '@/types';

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
  }, [data, error, showErrorSnackbar, startLoading, stopLoading, setVariationsImages]);

  return { isLoading, variationsImages, setVariationsImages };
};
