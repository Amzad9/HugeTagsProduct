export interface Brand {
  _id?: string;
  name?: string;
  description?: string;
  image?: string | File;
}
export interface BrandResponse {
  payload: Brand[],
  message: string;
  status: string;
}

export interface SingleBrandResponse {
  data: {
    payload: Brand,
    message: string;
  },
  status: string;
}
