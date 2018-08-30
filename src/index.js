import { declare } from "@babel/helper-plugin-utils";
import babelPlugin from "@babel/plugin-proposal-class-properties";

export default declare((api, options) => {
	api.assertVersion(7);

	const { pure } = options;


	if (pure) {
		return {
			visitor: {
				ClassDeclaration(path) {
					console.log(path.node.static, path.node.key.id.name);
				}
			}
		}
	}

	return babelPlugin(api, options);
});