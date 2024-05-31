type StyleProduct = 'urban' | 'sports' | 'unspecified';
type AgeProduct = 'child' | 'adult';
type BrandProduct = 'nike' | 'puma' | 'addidas' | 'other';
type GenderProduct = 'male' | 'female' | 'unspecified';
type UUID = `${string}-${string}-${string}-${string}-${string}`;
type CategoryProduct =
  | 't-shirts'
  | 'pants'
  | 'sneakers'
  | 'sweatshirts'
  | 'accessories'
  | 'toys'
  | 'jackets'
  | 'cap'
  | 'boots'
  | 'handbags'
  | 'bags'
  | 'bed sheets'
  | 'socks'
  | 'underwear'
  | 'leggings'
  | 'jeans'
  | 'sandals'
  | 'other';

type detailsImageVariation = {
  color: string;
  gender: GenderProduct;
  brand: BrandProduct;
  style: StyleProduct;
};

type ImageVariantsProduct = {
  description: string;
  primary_image: string;
  category: CategoryProduct;
  id: UUID;
  variations: VariationsType[];
  miniature_image: string;
  createdAt: Date;
  updatedAt: Date;
  details: detailsImageVariation;
};

type VariationsType = {
  name: string;
  id: UUID;
  images: string[];
};

interface ProductsBySupabase {
  id?: UUID;
  created_at?: Date;
  user?: UUID;
  produc_name: string;
  produc_style: StyleProduct;
  produc_size: string;
  produc_description: string;
  produc_price: number;
  produc_color: string;
  produc_category: CategoryProduct;
  produc_image_url: string;
  produc_age: AgeProduct;
  produc_gender: GenderProduct;
  produc_code?: string;
  produc_state: boolean;
  produc_stock?: number;
  produc_discount?: string;
  produc_brand: BrandProduct;
  produc_dollar_today?: number;
  produc_variations?: string;
}

type Filters = {
  category: string;
  size: string;
};

interface CategoryCreate {
  title: string;
  values: Value[];
}
