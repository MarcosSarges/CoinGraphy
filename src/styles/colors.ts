type Colors = typeof colors;

export type ColorKeys = {
  [K1 in keyof Colors]: {
    [K2 in keyof Colors[K1]]: Colors[K1][K2] extends object
      ? {
          [K3 in keyof Colors[K1][K2]]: `${K1 & string}.${K2 & string}.${K3 &
            string}`;
        }[keyof Colors[K1][K2]]
      : `${K1 & string}.${K2 & string}`;
  }[keyof Colors[K1]];
}[keyof Colors];

const windsor = {
  "800": "#7617b2",
  "900": "#61148f",
  "950": "#45006f",
};

const studio = {
  "300": "#ddbdf5",
  "500": "#b368e4",
  "950": "#401259",
};
const gray = {
  "100": "#f5f5f5",
  "200": "#eeeeee",
  "300": "#e0e0e0",
  "400": "#bdbdbd",
  "500": "#9e9e9e",
  "600": "#757575",
  "700": "#616161",
  "800": "#424242",
  "900": "#212121",
};

const black = {
  0: "#000",
  100: "#1E1E1E",
};

const white = {
  0: "#fff",
  100: "#f5f5f5",
};

const colors = {
  primary: {
    light: studio[300],
    main: studio[500],
    dark: studio[950],
  },
  secondary: {
    light: windsor[800],
    main: windsor[900],
    dark: windsor[950],
  },
  text: {
    default: black[100],
    light: white[0],
  },
  background: {
    default: black[0],
  },
  commons: {
    black: black[0],
    white: white[100],
    transparent: "transparent",
    gray,
  },
  danger: {
    light: "#ffadad",
    main: "#ff5252",
    dark: "#cc0000",
  },
  wanning: {
    light: "#ffe29f",
    main: "#ffc107",
    dark: "#ffab00",
  },
  success: {
    light: "#b9f6ca",
    main: "#00e676",
    dark: "#00c853",
  },
  info: {
    light: "#81d4fa",
    main: "#03a9f4",
    dark: "#0277bd",
  },
};

export default colors;
