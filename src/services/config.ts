import { CategoryConfigItem, CategoryConfigResponse } from '@/types';
import { supabase } from '../lib';
//import { v4 as uuidv4 } from 'uuid';

export const getCategoryConfig = async (): Promise<
  CategoryConfigItem[] | Error
> => {
  try {
    const { data: ldn_config, error } = await supabase
      .from('ldn_config')
      .select('data')
      .eq('name', 'category_type')
      .limit(1);

    if (error) {
      throw new Error(error.message);
    }

    if (ldn_config && Array.isArray(ldn_config) && ldn_config.length > 0) {
      const res: CategoryConfigResponse = ldn_config[0].data;
      res.categories.sort((a: CategoryConfigItem, b: CategoryConfigItem) =>
        a.name.localeCompare(b.name),
      );
      return res.categories;
    } else {
      throw new Error(
        'No se encontraron datos de configuración para la categoría.',
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error in service category configure');
  }
};

export const updateCategoryConfig = async (values: CategoryConfigItem) => {
  try {
    const res = await getCategoryConfig();
    if (Array.isArray(res)) {
      const newData = res.filter((category) => category.id !== values.id);
      newData.push({
        id: values.id,
        name: values.name,
        icon: values.icon || null,
      });
      const { error } = await supabase
        .from('ldn_config')
        .update({ data: { categories: newData } })
        .eq('name', 'category_type');
      if (error) throw new Error('No se encontró la categoría');
      return { ok: true };
    }
  } catch (error) {
    throw new Error('Error in service category configure');
  }
};

export const addCategoryConfig = async (newCategory: CategoryConfigItem) => {
  try {
    const currentConfig = await getCategoryConfig();
    if (Array.isArray(currentConfig)) {
      const newData = [...currentConfig];
      const existingCategory = newData.find(
        (category) => category.name === newCategory.name,
      );
      if (existingCategory) {
        throw new Error('Ya existe una categoría con ese nombre');
      }
      newData.push({
        id: newCategory.id,
        name: newCategory.name,
        icon: newCategory.icon || null,
      });
      const { error } = await supabase
        .from('ldn_config')
        .update({ data: { categories: newData } })
        .eq('name', 'category_type');

      if (error) {
        throw new Error('No se pudo agregar la categoría');
      }

      return { ok: true };
    } else {
      throw new Error('La configuración actual no es un array');
    }
  } catch (error) {
    throw new Error(`Error en el servicio addCategoryConfig: ${error}`);
  }
};

export const deleteCategoryConfig = async (categoryId: string) => {
  try {
    const currentConfig = await getCategoryConfig();
    if (Array.isArray(currentConfig)) {
      const newData = currentConfig.filter(
        (category) => category.id !== categoryId,
      );
      if (newData.length === currentConfig.length) {
        throw new Error('No se encontró la categoría con el ID proporcionado');
      }
      const { error } = await supabase
        .from('ldn_config')
        .update({ data: { categories: newData } })
        .eq('name', 'category_type');

      if (error) {
        throw new Error('No se pudo eliminar la categoría');
      }

      return { ok: true };
    } else {
      throw new Error('La configuración actual no es un array');
    }
  } catch (error) {
    throw new Error(`Error en el servicio deleteCategoryConfig: ${error}`);
  }
};
