import React, { useEffect, useState } from "react";
//interface
import { ProductDetailData } from "src/contexts/ErrorProductContext";
import {
  ColorOption,
  ColorOptionsContext,
} from "src/contexts/ColorOptionsContext";

//contexts
import { ErrorProductContext } from "src/contexts/ErrorProductContext";

// import { css } from "@emotion/react";
import axios from "axios";
import { Heading } from "@chakra-ui/layout";
import {
  Spinner,
  Button,
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Text,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { ProductDetail } from "src/components/ProductDetail";
import {
  UpdatedProductContext,
  UpdatedProductContextData,
} from "src/contexts/UpdatedProductContext";
import { Pagination } from "src/components/Pagination";
import { ReUploadProducts } from "./ReUploadProducts";

const TableHeader = ({ children }: { children: string }) => (
  <Text p={3} textAlign="left">
    {children}
  </Text>
);
export const UpdateProducts = () => {
  const [errorProductsData, setErrorProductsData] = useState<
    ProductDetailData[]
  >([]);
  const [updatedProducts, setUpdatedProducts] = useState<
    UpdatedProductContextData["updatedProducts"]
  >([]);
  const [colorOptions, setColorOptions] = useState<ColorOption[]>([]);
  const [isSubmitAble, setIsSubmitAble] = useState(false);
  const [togglePopover, setTogglePopover] = useState(false);
  const toggleOff = () => {
    setTogglePopover(false);
  };
  const toggleOn = () => {
    setTogglePopover(true);
  };
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(updatedProducts);

    return () => {};
  }, [updatedProducts]);

  const [isLoading, setIsLoading] = useState(false);
  //get all error product details on load
  useEffect(() => {
    const updateErrorProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://hiring-test.stag.tekoapis.net/api/products"
        );
        setIsLoading(false);
        setErrorProductsData(data);
      } catch (err) {
        setIsLoading(false);
        setError("Something went wrong, please try again");
      }
    };
    updateErrorProducts();
    const updateColorOptions = async () => {
      try {
        const { data } = await axios.get(
          "https://hiring-test.stag.tekoapis.net/api/colors"
        );
        setColorOptions(data);
      } catch (err) {
        setError("Error on getting color options");
      }
    };
    updateColorOptions();
    return () => {};
  }, []);
  const toast = useToast();

  return (
    <Box>
      <ErrorProductContext.Provider
        value={{ errorProductsData, setErrorProductsData }}
      >
        <UpdatedProductContext.Provider
          value={{ updatedProducts, setUpdatedProducts }}
        >
          <ColorOptionsContext.Provider
            value={{ colorOptions, setColorOptions }}
          >
            {togglePopover ? <ReUploadProducts toggleOff={toggleOff} /> : null}
            {isLoading ? (
              <Spinner size="lg" />
            ) : (
              <Box p={8}>
                <Flex justifyContent="space-between" mt={5} mb={4}>
                  <Heading as="h1" fontSize="2xl">
                    Jason - Re-upload Error Products
                  </Heading>
                </Flex>
                <PaginatedProductsDetail
                  productsPerPage={10}
                  productsDetail={errorProductsData}
                  setIsSubmitAble={setIsSubmitAble}
                ></PaginatedProductsDetail>

                <Box position="fixed" bottom={8} right={8}>
                  <Button
                    leftIcon={<CheckIcon />}
                    colorScheme="blue"
                    isDisabled={!isSubmitAble}
                    onClick={() => {
                      if (updatedProducts.length === 0) {
                        toast({
                          status: "error",
                          description: "Nothing was changes",
                        });
                      } else {
                        toggleOn();
                      }
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}
          </ColorOptionsContext.Provider>
        </UpdatedProductContext.Provider>
      </ErrorProductContext.Provider>
    </Box>
  );
};

const ProductsDetail = ({
  currentProducts,
  setIsSubmitAble,
}: {
  currentProducts: ProductDetailData[];
  setIsSubmitAble: (data: boolean) => void;
}) => {
  return (
    <Table w="100%" borderWidth="1px" borderColor="gray.100">
      <Thead>
        <Tr>
          <Th>
            <TableHeader>ID</TableHeader>
          </Th>
          <Th>
            <TableHeader>Error description</TableHeader>
          </Th>
          <Th>
            <TableHeader>Product image</TableHeader>
          </Th>
          <Th>
            <TableHeader>Product name</TableHeader>
          </Th>
          <Th>
            <TableHeader>SKU</TableHeader>
          </Th>
          <Th>
            <TableHeader>Color</TableHeader>
          </Th>
        </Tr>
      </Thead>
      {/* {renderAllProductsDetail(errorProductsData, colorOptions)} */}
      <Tbody>
        {currentProducts &&
          currentProducts.map((product) => (
            <ProductDetail
              id={product.id}
              errorDescription={product.errorDescription}
              name={product.name}
              sku={product.sku}
              image={product.image}
              color={product.color}
              key={product.id}
              setIsSubmitAble={setIsSubmitAble}
            />
          ))}
      </Tbody>
    </Table>
  );
};
const PaginatedProductsDetail = ({
  productsPerPage,
  productsDetail,
  setIsSubmitAble,
}: {
  productsPerPage: number;
  productsDetail: ProductDetailData[];
  setIsSubmitAble: (data: boolean) => void;
}) => {
  const [currentProducts, setCurrentProducts] = useState<ProductDetailData[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const temp = productsDetail.slice(indexOfFirstProduct, indexOfLastProduct);
    setCurrentProducts(temp);
    return () => {};
  }, [currentPage, productsDetail, productsPerPage]);

  return (
    <>
      <ProductsDetail
        currentProducts={currentProducts}
        setIsSubmitAble={setIsSubmitAble}
      ></ProductsDetail>
      <Pagination
        productsPerPage={10}
        totalProducts={productsDetail.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      ></Pagination>
    </>
  );
};
