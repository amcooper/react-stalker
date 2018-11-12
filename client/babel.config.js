module.exports = {
  presets: [
    // ["@babel/env", {"modules": false}],
    "@babel/env",
    "@babel/react"
  ],
  plugins: ["@babel/plugin-transform-modules-commonjs"],
  env: {
    test: {
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "transform-es2015-modules-commonjs",
        "babel-plugin-dynamic-import-node"
      ]
    }
  }
};
