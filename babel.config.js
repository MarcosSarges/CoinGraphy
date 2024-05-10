module.exports = {
  presets: ["module:@react-native/babel-preset", "@babel/preset-typescript"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          '@screens': "./src/screens",
          '@routes': "./src/routes",
          '@helpers': "./src/helpers",
          '@components': "./src/components",
          '@styles': "./src/styles",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
