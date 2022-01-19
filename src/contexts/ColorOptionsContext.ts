import { useContext, createContext } from "react";

export interface ColorOption {
  id: number;
  name: string;
}
export interface ColorOptionsContextData {
  colorOptions: ColorOption[];
  setColorOptions: (data: ColorOption[]) => void;
}
export const ColorOptionsContext = createContext<ColorOptionsContextData>({
  colorOptions: [],
  setColorOptions: () => {},
});

export const useColorOptionsContext = () => useContext(ColorOptionsContext);
