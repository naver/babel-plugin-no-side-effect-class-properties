# babel-plugin-no-side-effect-class-properties [![npm version](https://badge.fury.io/js/babel-plugin-no-side-effect-class-properties.svg)](https://badge.fury.io/js/babel-plugin-no-side-effect-class-properties)

> [Tree Shaking is a way to remove the code if it is not used.](https://medium.com/naver-fe-platform/tree-shaking-in-webpack-50fa2ca446f1)
>
> However, if you use the static class properties, you do not have to use that code. This is because side effects occur.
>
> If use class properties and have no side effects, use this plugin.
>
> This plugin transforms static class properties so that side effects do not occur.

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

## License

```
Copyright 2018 NAVER Corp.

Permission is hereby granted, free of charge, to any person obtaining 
a copy of this software and associated documentation files (the 
"Software"), to deal in the Software without restriction, including 
without limitation the rights to use, copy, modify, merge, publish, 
distribute, sublicense, and/or sell copies of the Software, and to 
permit persons to whom the Software is furnished to do so, subject to 
the following conditions:

The above copyright notice and this permission notice shall be 
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```