import React from "react";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const Screen4: React.FC = () => {
  return (
    <View>
      <Animated.Text entering={FadeIn}>Screen4</Animated.Text>
    </View>
  );
};

export default Screen4;
