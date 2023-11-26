export type VariationsType = {
  name: string;
  id: string;
  images: string[];
};
export type ImageVariantsProduct = {
  description: string;
  primary_image: string;
  category: string;
  id: string;
  variations: VariationsType[];
  miniature_image: string;
  createdAt: string;
  updatedAt: string;
};

export interface ProductsBySupabase {
  id: string;
  created_at: Date;
  user: string;
  produc_name: string;
  produc_style: string;
  produc_size: string;
  produc_description: string;
  produc_price: number;
  produc_color: string;
  produc_category: string;
  produc_image_url: string;
  produc_age: string;
  produc_gender: string;
  produc_code: string;
  produc_state: boolean;
  produc_stock: number;
  produc_discount: string;
  produc_brand: string;
  produc_dollar_today: number;
  produc_variations: string;
}
