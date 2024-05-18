import fonts from "./fonts";
import colors from "./colors";
import spacings from "./spacings";
import sizes from "./sizes";

export type TypeTheme = {
  fonts: typeof fonts;
  colors: typeof colors;
  spacings: typeof spacings;
  sizes: typeof sizes;
};

const theme: TypeTheme = { fonts, colors, spacings, sizes };

export type TPropWithTheme<T> = { theme: TypeTheme } & T;

export default theme;
