import React from "react";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const Screen1: React.FC = () => {
  return (
    <View>
      <Animated.Text entering={FadeIn}>Screen1</Animated.Text>
    </View>
  );
};

export default Screen1;
