import { declare } from "@babel/helper-plugin-utils";
import nameFunction from "@babel/helper-function-name";
import syntaxClassProperties from "@babel/plugin-syntax-class-properties";
import annotateAsPure from "@babel/helper-annotate-as-pure";
import { types as t } from "@babel/core";

const seen = new WeakSet();

export default declare((api, options) => {
	api.assertVersion(7);

	return {
		inherits: syntaxClassProperties,
		visitor: {
			Class(path) {
				const { node } = path;

				if (seen.has(node)) {
					return;
				} else {
					seen.add(node);
				}
				const body = path.get("body");
				let isStatic = false;
				let ref;

				for (const bodyPath of body.get("body")) {
					if (bodyPath.isClassProperty()) {
						isStatic = true;
						break;
					}
				}
				if (!isStatic) {
					return;
				}
				const isExpression = path.isClassExpression();

				if (isExpression || !path.node.id) {
					nameFunction(path);
					ref = path.scope.generateUidIdentifier("class");
				} else {
					ref = path.node.id;
				}
				const pureExpression = t.callExpression(
					t.arrowFunctionExpression([],
						isExpression ? node : t.blockStatement([node, t.returnStatement(t.cloneNode(ref))])
					),
					[]);

				annotateAsPure(pureExpression);

				const classNode = isExpression ? pureExpression : t.variableDeclaration("const", [
					t.variableDeclarator(t.cloneNode(ref), pureExpression),
				]);

				path.replaceWith(classNode);
			},
		},
	};
});
