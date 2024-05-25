import React from 'react';

interface LoadingIndicatorProps {
  isLoading: boolean;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  isLoading,
}) => {
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-50 z-50">
          <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin h-16 w-16"></div>
          <p className="ml-2">Cargando...</p>
        </div>
      )}
    </>
  );
};
