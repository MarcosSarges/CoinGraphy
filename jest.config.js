module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["./jest-setup.js"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(png|jpg|ico|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/image-mock.js",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|react-native-reanimated)/)",
  ],
};
