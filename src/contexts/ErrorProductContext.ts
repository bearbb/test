import { useContext, createContext } from "react";

export interface ProductDetailData {
  id: number;
  errorDescription: string;
  name: string;
  sku: string;
  image: string;
  color: number | null;
}
export interface ErrorProductContextData {
  errorProductsData: ProductDetailData[];
  setErrorProductsData: (data: ProductDetailData[]) => void;
}

export const ErrorProductContext = createContext<ErrorProductContextData>({
  errorProductsData: [],
  setErrorProductsData: () => {},
});

export const useErrorProductContext = () => useContext(ErrorProductContext);
