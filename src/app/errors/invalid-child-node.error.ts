import { NodePath } from '@babel/traverse';
import { getNodePathErrorMessage } from './nodepath-error-message';

export class InvalidChildNode extends Error {
	constructor(nodePath: NodePath, err?: TypeError) {
		super(`Child node must contain one and only one JSX expression containing a function\n${getNodePathErrorMessage(nodePath, err)}`);
	}
}
