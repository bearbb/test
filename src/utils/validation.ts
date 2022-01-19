export const isNameValid = (name: string) => {
  if (name === "" || name.length > 50) {
    return false;
  } else {
    return true;
  }
};
export const isSkuValid = (sku: string) => {
  if (sku === "" || sku.length > 20) {
    return false;
  } else {
    return true;
  }
};
