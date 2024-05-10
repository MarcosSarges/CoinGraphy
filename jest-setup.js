// // jest.useFakeTimers();
// // jest.runAllTimers();
import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => {
  const Reanimated = { default: { call: () => {} } };
  return Reanimated;
});

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
