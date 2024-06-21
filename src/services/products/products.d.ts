interface Product {
  size_value: string;
  size_id: string;
  category?: string;
  details?: Details;
  size?: string;
  name: string;
  product_id?: string;
  description?: string;
  primary_image?: string | File;
  price: number;
  state?: boolean;
  code?: number;
  stock?: number;
  discount?: number;
  category_id?: string;
  category_value?: string;
}

interface Details {
  detail_id?: string;
  gender?: string;
  color?: string;
  brand?: string;
  style?: string;
  age?: string;
}
