import { useContext, createContext } from "react";

import { ProductDetailData } from "src/contexts/ErrorProductContext";
export interface UpdatedProductsData {
  id: number;
  name: string;
  sku: string;
  color: number | null;
  image: string;
}
export interface UpdatedProductContextData {
  updatedProducts: UpdatedProductsData[];
  setUpdatedProducts: (data: UpdatedProductsData[]) => void;
}
export const UpdatedProductContext = createContext<UpdatedProductContextData>({
  updatedProducts: [],
  setUpdatedProducts: () => {},
});

export const useUpdatedProductContext = () => useContext(UpdatedProductContext);
