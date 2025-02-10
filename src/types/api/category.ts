export interface Category {
  _id?: string;
  categoryId?: string
  name?: string;
  description?: string;
  image?: string | File;
}
export interface CategoryResponse {
  data: { payload: Category[]; message: string; };
}

export interface Product {
  _id?: string,
  title?: string,
  description?: string,
  price: string,
  image?: File | string,
  category?: string,
  subcategory?: string,
  brandId?: string,
  stock?: number,
  rating: number,
  reviews?: string[]
}
