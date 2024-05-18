module.exports = {
  presets: ["module:@react-native/babel-preset", "@babel/preset-typescript"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@config": "./src/config",
          "@services": "./src/services",
          "@screens": "./src/screens",
          "@routes": "./src/routes",
          "@hooks": "./src/hooks",
          "@components": "./src/components",
          "@styles": "./src/styles",
          "@helpers": "./src/utils/helpers",
          "@constants": "./src/utils/constants",
          "@interfaces": "./src/interfaces",
          "@tests": "./src/utils/tests",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
