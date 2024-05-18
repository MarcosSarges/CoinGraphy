import "react-native-reanimated";
import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigation from "./routes/RootNavigation";
import { ThemeProvider } from "styled-components/native";
import theme from "@styles";

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
