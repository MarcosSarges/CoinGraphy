import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useWindowDimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

// const Item = ({ onPress, children, focus }) => {
//   console.log({ focus });
//   const { width } = useWindowDimensions();
//   const focusValue = useSharedValue(width / 5);
//   const stylesWithFocus = useAnimatedStyle(() => {
//     return {
//       width: interpolate(focusValue.value, [0, 1], [width / 5, width / 4]),
//     };
//   });

//   //   useEffect(() => {
//   //     setTimeout(() => {
//   //       if (focus) {
//   //         // stylesWithFocus.width = withTiming(width / 4, { duration: 2000 });
//   //         stylesWithFocus.width = width * 2; //withTiming(width / 4, { duration: 2000 });
//   //         console.log({ focus });
//   //       } else {
//   //         // stylesWithFocus.width = withTiming(width / 10, { duration: 1000 });
//   //         // console.log({ focus });
//   //       }
//   //     }, 1000);
//   //   }, [focus]);

//   return (
//     <Animated.Text
//       style={stylesWithFocus}
//       onPress={() => {
//         if (!focus) {
//           focusValue.value = withTiming(1, { duration: 2000 });
//         } else {
//           focusValue.value = withTiming(0, { duration: 1000 });
//         }

//         onPress();
//       }}
//     >
//       {children}
//     </Animated.Text>
//   );
// };

const TabBar: React.FC<BottomTabBarProps> = (props) => {
  const stylesWithFocus = useAnimatedStyle(() => {
    return {
      width:
        props.state.index === 0
          ? withTiming(100, { duration: 1000 })
          : withTiming(50, { duration: 500 }),
      backgroundColor: "blue",
    };
  }, [props.state.index]);

  const stylesWithFocus2 = useAnimatedStyle(() => {
    return {
      width:
        props.state.index === 1
          ? withTiming(100, { duration: 1000 })
          : withTiming(50, { duration: 500 }),
      backgroundColor: "red",
    };
  }, [props.state.index]);

  return (
    <S.Container style={{ paddingBottom: props.insets.bottom, width: "100%" }}>
      <Animated.View style={stylesWithFocus}>
        <Animated.Text
          onPress={() => {
            props.navigation.navigate("Home");
          }}
        >
          {props.state.routes[0].name}
        </Animated.Text>
      </Animated.View>
      <Animated.View style={stylesWithFocus2}>
        <Animated.Text
          onPress={() => {
            props.navigation.navigate("Screen1");
          }}
        >
          {props.state.routes[1].name}
        </Animated.Text>
      </Animated.View>
    </S.Container>
  );
};

export default TabBar;
