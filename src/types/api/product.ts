export interface Product {
  _id?: string;
  title?: string,
  description?: string,
  price: string,
  image: string | File;
  category: { _id: string; name: string } | string;
  subcategory: { _id: string; name: string } | string;
  brandId: { _id: string; name: string } | string;
  stock?: number | null;
  rating?: number | null;
  reviews?: string[]
}
export interface ProductResponse {
  payload: Product[],
  message: string;
  status: string;
}
export interface SingleProductResponse {
  payload: Product,
  message: string;
  status: string;
}
