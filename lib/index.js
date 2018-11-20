"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _helperFunctionName = _interopRequireDefault(require("@babel/helper-function-name"));

var _pluginSyntaxClassProperties = _interopRequireDefault(require("@babel/plugin-syntax-class-properties"));

var _helperAnnotateAsPure = _interopRequireDefault(require("@babel/helper-annotate-as-pure"));

var _core = require("@babel/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var seen = new WeakSet();

var _default = (0, _helperPluginUtils.declare)(function (api, options) {
  api.assertVersion(7);
  return {
    inherits: _pluginSyntaxClassProperties.default,
    visitor: {
      Class: function Class(path) {
        var node = path.node;

        if (seen.has(node)) {
          return;
        } else {
          seen.add(node);
        }

        var body = path.get("body");
        var isStatic = false;
        var ref;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = body.get("body")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var bodyPath = _step.value;

            if (bodyPath.isClassProperty()) {
              isStatic = true;
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (!isStatic) {
          return;
        }

        var isExpression = path.isClassExpression();

        if (isExpression || !path.node.id) {
          (0, _helperFunctionName.default)(path);
          ref = path.scope.generateUidIdentifier("class");
        } else {
          ref = path.node.id;
        }

        var pureExpression = _core.types.callExpression(_core.types.arrowFunctionExpression([], isExpression ? node : _core.types.blockStatement([node, _core.types.returnStatement(_core.types.cloneNode(ref))])), []);

        (0, _helperAnnotateAsPure.default)(pureExpression);
        var classNode = isExpression ? pureExpression : _core.types.variableDeclaration("const", [_core.types.variableDeclarator(_core.types.cloneNode(ref), pureExpression)]);
        path.replaceWith(classNode);
      }
    }
  };
});

exports.default = _default;