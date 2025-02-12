export interface Category {
  _id?: string;
  name?: string;
  description?: string;
  image?: string | File;
}
export interface CategoryResponse {
  payload: Category[];
  message: string;
  status: string;
}

export interface SingleCategoryResponse {
  data: {
    payload: Category;
    message: string;
  }
  status: string;
}


