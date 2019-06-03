import { NodePath } from '@babel/traverse';
import generate from '@babel/generator';
import { getDataForScope } from '../helpers';


export function getNodePathErrorMessage(nodePath: NodePath, err?: TypeError) {
	const { node } = nodePath;
	const result = generate(node);
	const data = getDataForScope(nodePath);

	let message = err && err.message || '';

	message += `\n\nNode: ${result.code}`;
	message += `\nLocation: ${JSON.stringify(node.loc)}`;
	message += `\nData: ${JSON.stringify(data, null, 2)}`;

	return message;
}
