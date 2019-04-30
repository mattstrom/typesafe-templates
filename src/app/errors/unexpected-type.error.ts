import generate from '@babel/generator';
import { NodePath } from '@babel/traverse';

import { getDataForScope } from '../helpers';


export class UnexpectedType extends TypeError {

	constructor(
		public readonly nodePath: NodePath,
		public readonly innerError: TypeError
	) {
		super(errorMessage(nodePath, innerError));
	}
}

function errorMessage(nodePath: NodePath, err: TypeError) {
	const { node } = nodePath;
	const result = generate(node);
	const data = getDataForScope(nodePath);

	let message = err.message;

	message += `\n\nNode: ${result.code}`;
	message += `\nLocation: ${JSON.stringify(node.loc)}`;
	message += `\nData: ${JSON.stringify(data, null, 2)}`;

	return message;
}
