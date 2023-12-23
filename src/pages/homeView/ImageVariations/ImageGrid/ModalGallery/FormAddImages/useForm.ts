interface useFormProps {
  collection: string;
  images: FileList | null;
  id: string;
  category: string;
}

export const useForm = (id: string, category: string): useFormProps => {
  return {
    collection: '',
    images: null,
    id,
    category,
  };
};
