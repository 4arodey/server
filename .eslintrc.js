module.exports = {
  "env": {
    "browser": true,
    "commonjs": true
  },
  "extends": "airbnb",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "no-use-before-define": ["error", { "functions": true, "classes": true }]
    },
    "ecmaVersion": 5
  }
};
