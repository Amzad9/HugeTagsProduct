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


