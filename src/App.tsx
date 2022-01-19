import React, { useState } from "react";
import "./App.css";

//interface
import { ErrorProductContextData } from "src/contexts/ErrorProductContext";

//components
import { UpdateProducts } from "src/components/UpdateProducts";

import {
  ChakraProvider,
  extendTheme,
  ThemeConfig,
  LightMode,
} from "@chakra-ui/react";

// //contexts
// import { ErrorProductContext } from "src/contexts/ErrorProductContext";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

function App() {
  return (
    <ChakraProvider theme={theme}>
      <LightMode>
        <UpdateProducts />
      </LightMode>
    </ChakraProvider>
  );
}

export default App;
