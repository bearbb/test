import "./App.css";

//components
import { UpdateProducts } from "src/components/UpdateProducts";

import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

function App() {
  return (
    <ChakraProvider theme={theme}>
      <UpdateProducts />
    </ChakraProvider>
  );
}

export default App;
