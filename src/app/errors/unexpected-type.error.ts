import { NodePath } from '@babel/traverse';
import { getNodePathErrorMessage } from './nodepath-error-message';

export class UnexpectedType extends TypeError {

	constructor(
		public readonly nodePath: NodePath,
		public readonly innerError: TypeError
	) {
		super(getNodePathErrorMessage(nodePath, innerError));
	}
}
