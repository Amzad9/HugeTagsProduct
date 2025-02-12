export interface SubCategory {
  _id?: string;
  categoryId?: string;
  name?: string;
  description?: string;
  image?: string | File;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubCategoryResponse {
  payload: SubCategory[];
  message: string;
}


export interface SingleSubCategoryResponse {
  data: {
    payload: SubCategory;
    message: string;
  },
  message: string;
}
