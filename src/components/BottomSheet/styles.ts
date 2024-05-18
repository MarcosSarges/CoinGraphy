import { ViewStyle } from "react-native";
import styled from "styled-components/native";

export const ButtonItem = styled.TouchableOpacity`
  width: 100%;
  padding: 10px;
  height: 50px;
  flex-direction: row;
  align-items: center;
`;

export const ImgCoin = styled.Image`
  height: 30px;
  width: 30px;
  margin-right: ${({ theme }) => theme.spacings.md};
`;

export const containerStyle = (height: number): ViewStyle => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: height / 2,
  backgroundColor: "#1E1E1E",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingVertical: 16,
});
