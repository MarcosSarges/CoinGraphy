import React from "react";
import * as S from "./styles";
import { TextInputProps } from "react-native";

interface IInputProps extends TextInputProps {
  light?: boolean;
}

const Input: React.FC<IInputProps> = (props) => {
  return <S.Container {...props} />;
};

export default Input;
