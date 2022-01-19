import { Flex, IconButton, Text } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
// import { useState } from "react";

export const Pagination = ({
  productsPerPage,
  totalProducts,
  currentPage,
  setCurrentPage,
}: {
  productsPerPage: number;
  totalProducts: number;
  currentPage: number;
  setCurrentPage: (data: number) => void;
}) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumber.push(i);
  }
  const incCurrentPage = () => {
    setCurrentPage(currentPage + 1);
    scrollToTop();
  };
  const decCurrentPage = () => {
    setCurrentPage(currentPage - 1);
    scrollToTop();
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Flex w="100%" justifyContent="flex-start" mt={3}>
      <Flex>
        <IconButton
          disabled={currentPage === 1}
          icon={<ChevronLeftIcon />}
          aria-label="Previous page"
          onClick={() => {
            decCurrentPage();
          }}
        />
        <Text p={3}>{currentPage}</Text>
        <IconButton
          disabled={currentPage === pageNumber[pageNumber.length - 1]}
          icon={<ChevronRightIcon />}
          aria-label="Next page"
          onClick={() => {
            incCurrentPage();
          }}
        />
      </Flex>
    </Flex>
  );
};
