module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    {name: "@storybook/addon-essentials", options: {}},
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
    "@storybook/addon-storysource",
    "storybook-dark-mode"
  ],
  "framework": "@storybook/react",
  "features": {
    "postcss": false
  },
  "core": {
    "builder": "webpack5"
  }
}