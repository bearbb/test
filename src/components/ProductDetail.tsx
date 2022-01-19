import React, { useEffect, useState } from "react";

//contexts
import { useErrorProductContext } from "src/contexts/ErrorProductContext";

//validation
import { isNameValid, isSkuValid } from "src/utils/validation";

//update
import { updateProduct } from "src/utils/updateProduct";

import {
  useColorOptionsContext,
  ColorOption,
} from "src/contexts/ColorOptionsContext";

import { ProductDetailData } from "src/contexts/ErrorProductContext";

import { Flex, Tr, Td, Image, Select, Input } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { css } from "@emotion/react";
import { useUpdatedProductContext } from "src/contexts/UpdatedProductContext";

interface ProductDetailProps extends ProductDetailData {
  setIsSubmitAble: (data: boolean) => void;
}

export const ProductDetail = ({
  id,
  errorDescription,
  name,
  sku,
  image,
  color,
  setIsSubmitAble,
}: ProductDetailProps) => {
  const { colorOptions } = useColorOptionsContext();
  const { updatedProducts, setUpdatedProducts } = useUpdatedProductContext();
  const { errorProductsData, setErrorProductsData } = useErrorProductContext();
  const [productName, setProductName] = useState<string>(name);
  const [isProductNameValid, setIsProductNameValid] = useState(true);
  const productNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //max length 50 character
    if (e.target.value.length <= 50) {
      setProductName(e.target.value);
    }
  };
  useEffect(() => {
    // console.log(productName);
    if (productName === "") {
      setIsProductNameValid(false);
    } else {
      setIsProductNameValid(true);
    }
    return () => {};
  }, [productName]);
  const [productSku, setProductSku] = useState<string>(sku);
  const [isProductSkuValid, setIsProductSkuValid] = useState(true);
  const productSkuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 20) {
      setProductSku(e.target.value);
    }
  };
  useEffect(() => {
    if (productSku === "") {
      setIsProductSkuValid(false);
    } else {
      setIsProductSkuValid(true);
    }
  }, [productSku]);
  const [productColor, setProductColor] = useState(color);
  const productColorHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const colorId = parseInt(e.target.value);
    setProductColor(colorId);
  };
  const [isPNameEdited, setIsPNameEdited] = useState(false);
  const [isPSkuEdited, setIsPSkuEdited] = useState(false);
  const [isPColorEdited, setIsPColorEdited] = useState(false);

  useEffect(() => {
    if (productName !== name) {
      setIsPNameEdited(true);
    } else {
      setIsPNameEdited(false);
    }
  }, [productName, name]);

  useEffect(() => {
    if (productSku !== sku) {
      setIsPSkuEdited(true);
    } else {
      setIsPSkuEdited(false);
    }
  }, [sku, productSku]);

  useEffect(() => {
    if (productColor !== color) {
      setIsPColorEdited(true);
    } else {
      setIsPColorEdited(false);
    }
  }, [color, productColor]);

  useEffect(() => {
    if (isPNameEdited || isPSkuEdited || isPColorEdited) {
      //one of them is edited => validate it
      if (isSkuValid(productSku) && isNameValid(productName)) {
        updateProduct(
          id,
          productName,
          productSku,
          productColor,
          errorProductsData,
          updatedProducts,
          setUpdatedProducts
        );
        setIsSubmitAble(true);
      } else {
        setIsSubmitAble(false);
      }
    }

    return () => {};
  }, [
    productName,
    productSku,
    isPColorEdited,
    isPNameEdited,
    isPSkuEdited,
    setIsSubmitAble,
    id,
    productColor,
    errorProductsData,
    updatedProducts,
    setUpdatedProducts,
  ]);

  return (
    <Tr>
      <Td>
        <label>{id}</label>
      </Td>
      <Td>
        <label>{errorDescription}</label>
      </Td>
      <Td>
        <Image w="200px" src={image}></Image>
      </Td>
      <Td>
        <Flex alignItems="center" gap={3}>
          <Input
            focusBorderColor={isProductNameValid ? "blue.500" : "red.500"}
            borderColor={isProductNameValid ? "white" : "red.500"}
            value={productName}
            onChange={(e) => {
              productNameHandler(e);
            }}
          ></Input>
          {isPNameEdited ? <EditIcon color="orange.500" /> : null}
        </Flex>
      </Td>
      <Td>
        <Flex alignItems="center" gap={3}>
          <Input
            focusBorderColor={isProductSkuValid ? "blue.500" : "red.500"}
            borderColor={isProductSkuValid ? "white" : "red.500"}
            value={productSku}
            onChange={(e) => {
              productSkuHandler(e);
            }}
          ></Input>
          {isPSkuEdited ? <EditIcon color="orange.500" /> : null}
        </Flex>
      </Td>
      <Td>
        <Flex alignItems="center" gap={3}>
          <Select
            onChange={(e) => {
              productColorHandler(e);
            }}
            defaultValue={color !== null ? color.toString() : -1}
          >
            {color === null && <option value="-1">Select value</option>}
            {renderColorOptions(colorOptions, color)}
          </Select>
        </Flex>
      </Td>
    </Tr>
  );
};

const renderColorOptions = (
  colorOptions: ColorOption[],
  defaultValue: number | null
) => {
  return colorOptions.map((option) => {
    if (defaultValue !== null && defaultValue === option.id) {
      return (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      );
    } else {
      return (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      );
    }
  });
};
