import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@screens/Authenticated/Home";

const Stack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default RootNavigation;
