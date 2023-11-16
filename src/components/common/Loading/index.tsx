interface LoadingIndicatorProps {
  isLoading: boolean;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  isLoading,
}) => {
  return (
    <>
      {isLoading && (
        <div className="loading-indicator">
          <p>Cargando...</p>
        </div>
      )}
    </>
  );
};
