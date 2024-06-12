/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardContent, CardHeader, CardTitle } from '@components';

interface CardImageVariationsProps {
  variation: Variants;
  handleDelete: () => void;
  onCLickImage: () => void;
}

export const CardImageVariations: React.FC<CardImageVariationsProps> = ({
  variation,
  handleDelete,
  onCLickImage,
}) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex justify-between lg:text-sm">
          {variation.title}
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="lg:h-6 lg:w-6 lg:text-xs 2xl:h-8 2xl:text-base"
          >
            X
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <img
          src={variation.values[0].images[0]}
          className="h-96 w-96 cursor-pointer rounded-xl object-fill lg:h-52 2xl:h-56"
          onClick={onCLickImage}
          loading="lazy"
        />
      </CardContent>
    </Card>
  );
};
