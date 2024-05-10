import "react-native-reanimated";
import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigation from "./routes/RootNavigation";

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
}

export default App;
