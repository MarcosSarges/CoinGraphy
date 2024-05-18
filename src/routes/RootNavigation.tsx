/* eslint-disable react/no-unstable-nested-components */
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "@screens/Authenticated/Home";
import Screen1 from "@screens/Authenticated/Screen1";
import Screen2 from "@screens/Authenticated/Screen2";
import Screen3 from "@screens/Authenticated/Screen3";
import Screen4 from "@screens/Authenticated/Screen4";
import TabBar from "./components/TabBar";

const BottomTab = createBottomTabNavigator();

function RootNavigation() {
  return (
    <BottomTab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        header: () => null,
      }}
    >
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Screen1" component={Screen1} />
      <BottomTab.Screen name="Screen2" component={Screen2} />
      <BottomTab.Screen name="Screen3" component={Screen3} />
      <BottomTab.Screen name="Screen4" component={Screen4} />
    </BottomTab.Navigator>
  );
}

export default RootNavigation;
