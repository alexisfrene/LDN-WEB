// /* eslint-disable no-useless-escape */
// import { useContext } from 'react';
// import { FormikHelpers } from 'formik';
// import { createProducts } from '@services';
// import { SnackbarContext, LoadingContext } from '@presentation/context';
// import {
//   AgeProduct,
//   BrandProduct,
//   CategoryProduct,
//   GenderProduct,
//   Products,
//   StyleProduct,
// } from '@src/types';

// interface SpecProps extends submitProps, Spec {}

// type submitProps = { image: string; category: CategoryProduct; size: string };
// type Spec = {
//   name: string;
//   price: number;
//   brand: BrandProduct;
//   color: string;
//   description: string;
//   gender: GenderProduct;
//   age: AgeProduct;
//   style: StyleProduct;
// };

// export const useSubmit = ({ image, category, size }: submitProps) => {
//   const { showErrorSnackbar, showSuccessSnackbar } =
//     useContext(SnackbarContext);
//   const { startLoading, stopLoading } = useContext(LoadingContext);
//   return async (spec: Spec, formikActions: FormikHelpers<Spec>) => {
//     try {
//       startLoading();
//       const res = await axiosPromise({ image, category, size, ...spec });
//       if (res?.length) {
//         formikActions.resetForm();
//         showSuccessSnackbar(`Producto creado : ${res[0].produc_name}`);
//       }
//     } catch (err) {
//       showErrorSnackbar(`Error : ${err}`);
//     } finally {
//       formikActions.setSubmitting(false);
//       stopLoading();
//     }
//   };
// };

// export const formatUrl = (image_url: string, category: string) => {
//   if (image_url) {
//     const fileExt = image_url.split('.').pop();
//     const fileName = image_url.replace(/^.*[\\\/]/, '');
//     const filePath = `${category}/${Date.now()}`;
//     const formData = new FormData();
//     const photo = {
//       uri: image_url,
//       type: `image/${fileExt}`,
//       name: fileName,
//     };
//     formData.append('file', photo.uri);
//     formData.append('public_id', filePath);
//     formData.append('api_key', '733783188277347');
//     formData.append('upload_preset', 'ldn_preset');

//     return { formData, filePath };
//   } else {
//     return { formData: undefined, filePath: undefined };
//   }
// };

// const uploadImageProduc = async (image_url: string, category: string) => {
//   const cloudinaryURL = 'https://api.cloudinary.com/v1_1/ldn-img/image/upload';
//   const { formData, filePath } = formatUrl(image_url, category);
//   try {
//     const response = await fetch(cloudinaryURL, {
//       method: 'POST',
//       body: formData,
//     });
//     if (response.ok) {
//       return `ldn-images/${filePath}`;
//     } else {
//       console.error('ERROR EN uploadImageProduc');
//     }
//   } catch (error) {
//     console.error('Error al subir la imagen a Cloudinary:', error);
//   }
// };

// const axiosPromise = async (spec: SpecProps) => {
//   const { image, category } = spec;
//   const url_image = await uploadImageProduc(image, category);
//   if (url_image) {
//     spec.image = url_image;
//     const values = transformSpec(spec);

//     return await createProducts(values);
//   } else {
//     console.error('Error al subir la imagen');
//   }
// };

// const transformSpec = (spec: SpecProps): Products => {
//   return {
//     name: spec.name,
//     description: spec.description,
//     price: Number(spec.price),
//     state: true,
//     dollar_today: 0,
//   };
// };
