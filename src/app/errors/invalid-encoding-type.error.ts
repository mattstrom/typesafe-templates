import { NodePath } from '@babel/traverse';
import { getNodePathErrorMessage } from './nodepath-error-message';

export class InvalidEncodingType extends Error {
	constructor(type: string, nodePath: NodePath, err?: TypeError) {
		super(`Invalid encoding type '${type}'.\n${getNodePathErrorMessage(nodePath, err)}`);
	}
}
