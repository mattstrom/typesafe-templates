import { NodePath } from '@babel/traverse';

import { NodeTypeNotSupportedError } from '../errors';
import { getDataForScope } from './get-data-for-scope';


export function resolveOperand(operand: NodePath): any {
	if (operand.isMemberExpression()) {
		const property = operand.get('property') as NodePath;
		return resolveOperand(property);
	} else {
		if (operand.isIdentifier()) {
			const id = operand.node.name;
			const data = getDataForScope(operand);

			return data[id];
		} else {
			if (operand.isStringLiteral()) {
				return operand.node.value;
			} else {
				throw new NodeTypeNotSupportedError(operand.node, resolveOperand.name);
			}
		}
	}
}
