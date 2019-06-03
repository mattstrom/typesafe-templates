import { NodePath } from '@babel/traverse';
import { getNodePathErrorMessage } from './nodepath-error-message';

export class InvalidExpression extends Error {
	constructor(expr: string, nodePath: NodePath, err?: TypeError) {
		super(`Expression '${expr}' is not valid.\n${getNodePathErrorMessage(nodePath, err)}`);
	}
}
