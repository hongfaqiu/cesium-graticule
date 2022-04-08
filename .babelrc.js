const config = {
  "sourceType": "unambiguous",
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ],
  "plugins": []
}

if (process.title === "webpack") {
  config.plugins.push("@babel/transform-runtime");
}

module.exports = config;