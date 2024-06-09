import { LoadingIndicator } from '@src/presentation/components';
import { getAllVariations } from '@src/services';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const ImageGrid: React.FC = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: () => getAllVariations(),
  });
  if (isPending) {
    return <LoadingIndicator isLoading />;
  }
  if (error) return 'An error has occurred: ' + error.message;
  console.log(data);
  return (
    <div>{data && data.map((e: { title: string }) => <p>{e.title}</p>)}</div>
  );
};
