module.exports = {
  root: true,
  extends: "@react-native",
  rules: {
    quotes: 0,
    "no-unused-vars": ["warn"],
  },
  overrides: [
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
};
