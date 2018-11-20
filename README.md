# babel-plugin-no-side-effect-class-properties [![npm version](https://badge.fury.io/js/babel-plugin-no-side-effect-class-properties.svg)](https://badge.fury.io/js/babel-plugin-no-side-effect-class-properties)

> if use class properties and have no side effects, use this plugin.

## Install

Using npm:

```sh
npm install --save-dev babel-plugin-no-side-effect-class-properties
```

.babelrc

```json
{
  "plugins": [
    ["no-side-effect-class-properties"],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ]
}

```