import "styled-components/native";
import { TypeTheme } from ".";

declare module "styled-components/native" {
  export interface DefaultTheme extends TypeTheme {}
}
