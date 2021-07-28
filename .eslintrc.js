module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
  extends: process.env.NODE_ENV === "production" ? ["plugin:vue/essential", "eslint:recommended"]:[
    "plugin:vue/strongly-recommended",
    "plugin:prettier/recommended",
    "@vue/prettier",
  ],  
};
