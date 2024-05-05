export type StyleProduct = 'urban' | 'sports' | 'unspecified';
export type AgeProduct = 'child' | 'adult';
export type BrandProduct = 'nike' | 'puma' | 'addidas' | 'other';
export type GenderProduct = 'male' | 'female' | 'unspecified';
export type UUID = `${string}-${string}-${string}-${string}-${string}`;
export type CategoryProduct =
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

export type detailsImageVariation = {
  color: string;
  gender: GenderProduct;
  brand: BrandProduct;
  style: StyleProduct;
};

export type ImageVariantsProduct = {
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

export type VariationsType = {
  name: string;
  id: UUID;
  images: string[];
};

export interface ProductsBySupabase {
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

export type Filters = {
  category: string;
  size: string;
};

export interface Products {
  category: Category;
  details: Details;
  size: Size;
  name: Name;
  product_id: string;
  description: Description;
  primary_image: string;
  price: number;
  state: boolean;
  code: number;
  stock: number;
  discount: number;
}

export enum Category {
  Borcego = 'Borcego',
}

export enum Description {
  Descriop = 'descriop',
}

export interface Details {
  detail_id: string;
  gender: Age;
  color: Age;
  brand: Age;
  style: Age;
  age: Age;
}

export enum Age {
  Unspecified = 'unspecified',
}

export enum Name {
  Nombre = 'nombre',
}

export enum Size {
  M = 'M',
}
