import styled from "styled-components/native";
import { ITypographyProps } from "./interface";
import _ from "lodash";

export const TypographyComponent = styled.Text<ITypographyProps>`
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
  color: ${({ theme, color, light }) =>
    color
      ? _.get(theme.colors, color)
      : theme.colors.text[light ? "light" : "default"]};

  font-size: ${({ theme, size }) => size && theme.sizes[size]};
  font-weight: ${({ theme, fontWeight }) =>
    fontWeight
      ? theme.fonts.fontWeight[fontWeight]
      : theme.fonts.fontWeight[400]};
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "none")};
`;
