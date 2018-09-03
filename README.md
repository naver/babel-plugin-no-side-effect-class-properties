# @daybrush/babel-plugin-no-side-effects-class-properties

> if use class properties and have no side effects, use this plugin.

## Install

Using npm:

```sh
npm install --save-dev @daybrush/babel-plugin-no-side-effects-class-properties
```

.babelrc

```json
{
  "plugins": [
    ["@daybrush/babel-plugin-no-side-effect-class-properties"],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ]
}

```