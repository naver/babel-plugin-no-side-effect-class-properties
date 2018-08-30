"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _pluginProposalClassProperties = _interopRequireDefault(require("@babel/plugin-proposal-class-properties"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _helperPluginUtils.declare)(function (api, options) {
  api.assertVersion(7);
  var pure = options.pure;

  if (pure) {
    return {
      visitor: {
        ClassDeclaration: function ClassDeclaration(path) {
          console.log(path.node.static, path.node.key.id.name);
        }
      }
    };
  }

  return (0, _pluginProposalClassProperties.default)(api, options);
});

exports.default = _default;