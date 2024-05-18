import { TPropWithTheme } from "@styles/index";
import styled from "styled-components/native";
import { IInputProps } from "./Input";

export const Container = styled.TextInput.attrs(
  ({ theme, light }: TPropWithTheme<IInputProps>) => ({
    placeholderTextColor: theme.colors.commons.gray[light ? "300" : "800"],
  })
)<IInputProps>`
  padding-horizontal: ${({ theme }) => theme.spacings.md};
  padding-vertical: ${({ theme }) => theme.spacings.xs};
  font-size: ${({ theme }) => theme.sizes.md};
  color: ${({ theme, light }) =>
    theme.colors.text[light ? "light" : "default"]};
  width: 90%;
  align-self: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.commons.gray[400]};
  text-transform: ${({ uppercase }) => (uppercase ? "uppercase" : "none")};
`;
