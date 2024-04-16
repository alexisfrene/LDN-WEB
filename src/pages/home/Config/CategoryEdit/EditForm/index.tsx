import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Formik } from 'formik';
import { producsCategory } from '@/mocks';
import {
  Button,
  Input,
  Label,
  ScrollArea,
  ToggleGroup,
  ToggleGroupItem,
} from '@/components';
import { CategoryConfigItem, UUID } from '@/types';

type EditFormProps = {
  category?: CategoryConfigItem;
  handleSubmit: (values: CategoryConfigItem) => void;
};

export const EditForm: React.FC<EditFormProps> = ({
  category,
  handleSubmit,
}) => {
  const data = category
    ? category
    : { name: '', id: uuidv4() as UUID, icon: null };
  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <Label>Nombre de la categoría :</Label>
          <Input
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder={data.name}
            max={20}
          />
          <Label>Selecciona un icono :</Label>
          <ScrollArea className="h-52 my-10">
            <ToggleGroup
              type="single"
              className="flex flex-wrap gap-3 justify-start"
              defaultValue={data.icon || ''}
              onValueChange={(value) => setFieldValue('icon', value)}
            >
              {producsCategory.map((e, i) => (
                <ToggleGroupItem
                  key={i}
                  value={e.type}
                  className="w-16 hover:bg-slate-100 hover:scale-105 transition-all ease-in-out rounded-sm cursor-pointer"
                >
                  <img src={e.icon} key={i} />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </ScrollArea>
          <Button type="submit" disabled={isSubmitting}>
            Guardar
          </Button>
        </form>
      )}
    </Formik>
  );
};
