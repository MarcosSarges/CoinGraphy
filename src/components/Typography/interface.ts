import theme from "@styles";
import { ColorKeys } from "@styles/colors";
import { TextProps } from "react-native";

export interface ITypographyProps extends TextProps {
  size?: keyof typeof theme.sizes;
  fontWeight?: keyof typeof theme.fonts.fontWeight;
  textAlign?: "left" | "center" | "right" | "justify";
  color?: ColorKeys;
  uppercase?: boolean;
  light?: boolean;
}
