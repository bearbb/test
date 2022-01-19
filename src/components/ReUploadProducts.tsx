import React from "react";

import {
  Button,
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import {
  useUpdatedProductContext,
  UpdatedProductsData,
} from "src/contexts/UpdatedProductContext";
import {
  ColorOption,
  useColorOptionsContext,
} from "src/contexts/ColorOptionsContext";

export const ReUploadProducts = ({ toggleOff }: { toggleOff: () => void }) => {
  const { updatedProducts } = useUpdatedProductContext();
  const { colorOptions } = useColorOptionsContext();
  console.log(updatedProducts);
  return (
    <Flex
      w="100vw"
      h="100vh"
      position="fixed"
      justifyContent="center"
      alignItems="center"
      zIndex="1000"
      bgColor="rgba(160, 174, 192, 0.4)"
      // backdropFilter="blur(2px)"
      onClick={toggleOff}
    >
      <Box w="50%" h="70%" bgColor={useColorModeValue("white", "gray.800")}>
        <Flex
          h="10%"
          justifyContent="space-between"
          alignItems="center"
          pl={6}
          pr={6}
          borderBottom="1px solid #EDF2F7"
        >
          <Text fontSize="xl" fontWeight="semibold">
            Re-uploaded Products
          </Text>
          <CloseIcon onClick={toggleOff} cursor="pointer" />
        </Flex>
        <Box overflowY="auto" h="80%">
          {updatedProducts.map((p) => (
            <ReUploadProduct
              key={p.id}
              id={p.id}
              name={p.name}
              sku={p.sku}
              color={p.color}
              image={p.image}
              colorOptions={colorOptions}
            />
          ))}
        </Box>
        <Box h="10%" bottom={0} borderTop="1px solid #EDF2F7">
          <Flex
            w="100%"
            h="100%"
            justifyContent="flex-end"
            alignItems="center"
            pr={8}
          >
            <Button
              colorScheme="blue"
              onClick={(e) => {
                e.preventDefault();
                toggleOff();
              }}
            >
              OK
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

interface ReUploadProductProps extends UpdatedProductsData {
  colorOptions: ColorOption[];
}

const ReUploadProduct = ({
  image,
  name,
  id,
  sku,
  color,
  colorOptions,
}: ReUploadProductProps) => {
  const colorIndex =
    color !== null ? colorOptions.findIndex((c) => c.id === color) : -1;
  const colorInString =
    colorIndex !== -1 ? colorOptions[colorIndex].name : "Not selected";
  return (
    <Flex w="100%" p={4} gap={4} borderBottom="1px solid #EDF2F7">
      <Box w="30%" display="flex" justifyContent="center" alignItems="center">
        <Image src={image} w="100px" />
      </Box>
      <Box w="60%">
        <Text fontWeight="semibold">{name}</Text>
        <Text>
          <label>ID: </label>
          {id}
        </Text>
        <Text>
          <label>SKU: </label>
          <span style={{ color: "#f56565" }}>{sku}</span>
        </Text>
        <Text>
          <label>Color: </label>
          <span style={{ fontWeight: "bold" }}>{colorInString}</span>
        </Text>
      </Box>
    </Flex>
  );
};
