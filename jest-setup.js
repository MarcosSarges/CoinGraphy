// // jest.useFakeTimers();
// // jest.runAllTimers();
import "react-native-gesture-handler/jestSetup";
import 'jest-styled-components'

jest.mock("react-native-reanimated", () => {
  const Reanimated = { default: { call: () => {} } };
  return Reanimated;
});

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

