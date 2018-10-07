# babel-plugin-no-side-effects-class-properties

> if use class properties and have no side effects, use this plugin.

## Install

Using npm:

```sh
npm install --save-dev babel-plugin-no-side-effects-class-properties
```

.babelrc

```json
{
  "plugins": [
    ["babel-plugin-no-side-effect-class-properties"],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
  ]
}

```