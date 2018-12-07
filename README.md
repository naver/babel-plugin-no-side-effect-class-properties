# babel-plugin-no-side-effect-class-properties [![npm version](https://badge.fury.io/js/babel-plugin-no-side-effect-class-properties.svg)](https://badge.fury.io/js/babel-plugin-no-side-effect-class-properties)

> [Tree Shaking is a way to remove the code if it is not used.](https://medium.com/naver-fe-platform/tree-shaking-in-webpack-50fa2ca446f1)
>
> However, if you use the static class properties, you do not have to use that code. This is because side effects occur.
>
> if use class properties and have no side effects, use this plugin.

* Before Transpile
```js
export default class A {
  static a = 1;
}
```
*  After Transpile
```js
var A = /*#__PURE__*/function A() {
  _classCallCheck(this, A);
};

A.a = 1;

export default A;
```
> ```A.a = 1;``` is not in the ```/*#__PURE__*/``` area. So Tree Shaking does not work as side effect occurs.
>
> But the result I want is that ```A.a = 1;``` is also in the ```/*#__PURE__*/``` area.
> 
> If you use this plugin, it will be Tree shaking without side effect.
```js
var A = /*#__PURE__*/function () {
  var A = /*#__PURE__*/function A() {
    _classCallCheck(this, A);
  }
  A.a = 1;
  return A;
};

export default A;
```


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
