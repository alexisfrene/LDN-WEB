import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre del producto es obligatorio')
    .max(30, 'El nombre no puede tener más de 30 letras'),
  price: Yup.number().required('El precio es obligatorio'),
  description: Yup.string().max(
    100,
    'La descripción no puede tener más de 100 letras',
  ),
  details: Yup.object().shape({
    brand: Yup.string().max(50, 'La marca no puede tener más de 50 letras'),
    style: Yup.string().max(50, 'El estilo no puede tener más de 50 letras'),
    color: Yup.string().max(50, 'El color no puede tener más de 50 letras'),
    age: Yup.string().max(15, 'La edad no puede tener mas de 15 de longitud'),
    gender: Yup.string().max(50, 'El género no puede tener más de 50 letras'),
  }),
  stock: Yup.number().default(1),
  primary_image: Yup.mixed().required('La imagen es obligatoria'),
  category: Yup.object().shape({
    category_id: Yup.string().required('La categoría es obligatoria'),
    category_value_id: Yup.string().required('La categoría es obligatoria'),
  }),
  size: Yup.object().shape({
    size_id: Yup.string().required('La numero/talla es obligatoria '),
    size_value_id: Yup.string().required('La numero/talla es obligatoria '),
  }),
});

export default validationSchema;
