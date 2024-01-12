//import { useContext } from 'react';
import { ProductsBySupabase } from '@/types';
import { FormikHelpers } from 'formik';
import { createProductsBySupabase } from '../../../../services';
//import { SnackbarContext, LoadingContext } from '../../../../context';
interface SpecProps extends submitProps, Spec {}
type submitProps = { image: string; category: string; size: string };
type Spec = {
  name: string;
  price: string;
  brand: string;
  color: string;
  description: string;
  gender: string;
  age: string;
  style: string;
};

export const useSubmit = ({ image, category, size }: submitProps) => {
  // const { showErrorSnackbar, showSuccessSnackbar, showWarningSnackbar } =
  //   useContext(SnackbarContext);
  // const { startLoading, stopLoading } = useContext(LoadingContext);

  return async (spec: Spec, formikActions: FormikHelpers<Spec>) => {
    try {
      // startLoading();
      const res = await axiosPromise({ image, category, size, ...spec });
      console.log(res);
      // formikActions.resetForm();
      // if (membershipStatus.includes('NO HABILITADO')) {
      //   showWarningSnackbar(membershipStatus);
      // } else {
      //   showSuccessSnackbar(membershipStatus);
      // }
    } catch (err) {
      //showErrorSnackbar(err.message);
    } finally {
      formikActions.setSubmitting(false);
      //  stopLoading();
    }
  };
};

export const formatUrl = (image_url, category) => {
  if (!!image_url) {
    const fileExt = image_url.split('.').pop();
    const fileName = image_url.replace(/^.*[\\\/]/, '');
    const filePath = `${category}/${Date.now()}`;
    const formData = new FormData();
    const photo = {
      uri: image_url,
      type: `ìmage/${fileExt}`,
      name: fileName,
    };
    formData.append('file', photo.uri);
    formData.append('public_id', filePath);
    formData.append('api_key', '733783188277347');
    formData.append('upload_preset', 'ldn_preset');

    return { formData, filePath };
  } else {
    return { formData: undefined, filePath: undefined };
  }
};

const uploadImageProduc = async (image_url: string, category: string) => {
  const cloudinaryURL = 'https://api.cloudinary.com/v1_1/ldn-img/image/upload';
  const { formData, filePath } = formatUrl(image_url, category);
  try {
    const response = await fetch(cloudinaryURL, {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      return `ldn-images/${filePath}`;
    } else {
      console.error('ERROR EN uploadImageProduc');
    }
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error);
  }
};

const axiosPromise = async (spec: SpecProps) => {
  const { image, category } = spec;
  const url_image = await uploadImageProduc(image, category);

  if (url_image) {
    spec.image = url_image;
    const values = transformSpec(spec);
    return await createProductsBySupabase(values);
  }
  const apiSpec = transformSpec(spec);

  console.log('APISPEC', apiSpec);
  const res = await createProductsBySupabase(apiSpec);
  return res;
};

interface Dashg {
  produc_gender: string;
  produc_age: string;
  produc_style: string;
  produc_brand: string;
  produc_size: string;
  produc_name: string;
  produc_description: string;
  produc_price: string;
  produc_color: string;
  produc_category: string;
  produc_image_url: string;
  produc_dollar_today: number;
  user: string;
}

const transformSpec = (spec: SpecProps): Dashg => {
  return {
    produc_name: spec.name,
    produc_style: spec.style,
    produc_size: spec.size,
    produc_description: spec.description,
    produc_price: spec.price,
    produc_color: spec.color,
    produc_category: spec.category,
    produc_image_url: spec.image,
    produc_age: spec.age,
    produc_gender: spec.gender,
    produc_state: true,
    produc_brand: spec.brand,
    produc_dollar_today: 0,
  };
};
