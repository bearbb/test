import { ErrorProductContextData } from "src/contexts/ErrorProductContext";
import { UpdatedProductContextData } from "src/contexts/UpdatedProductContext";
export const updateProduct = (
  id: number,
  name: string,
  sku: string,
  color: number | null,
  errorProductsData: ErrorProductContextData["errorProductsData"],
  updatedProducts: UpdatedProductContextData["updatedProducts"],
  setUpdatedProducts: UpdatedProductContextData["setUpdatedProducts"]
) => {
  console.log("updating");

  //find if id is exist in the updatedProducts arr
  const index = updatedProducts.findIndex((product) => {
    return product.id === id;
  });
  if (index === -1) {
    //not exist then added new one
    const image =
      errorProductsData[errorProductsData.findIndex((p) => p.id === id)].image;
    let temp = updatedProducts;
    temp.push({ id, name, sku, image, color });
    console.log(temp);
    if (isProductDetailChanged(id, name, sku, color, errorProductsData)) {
      setUpdatedProducts(temp);
    }
  } else {
    //already exist => update the old one
    let temp = updatedProducts;
    temp[index] = { ...temp[index], color, sku, name };
    console.log(temp);
    if (isProductDetailChanged(id, name, sku, color, errorProductsData)) {
      setUpdatedProducts(temp);
    } else {
      //delete the exist one
      temp.splice(index, 1);
      setUpdatedProducts(temp);
    }
  }
};

const isProductDetailChanged = (
  id: number,
  name: string,
  sku: string,
  color: number | null,
  errorProductsData: ErrorProductContextData["errorProductsData"]
) => {
  //check if data is changed or not
  const index = errorProductsData.findIndex((p) => p.id === id);
  if (
    errorProductsData[index].name === name &&
    errorProductsData[index].sku === sku &&
    errorProductsData[index].color === color
  ) {
    return false;
  } else {
    return true;
  }
};
