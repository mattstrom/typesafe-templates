import { NodePath } from '@babel/traverse';
import { Expression, Identifier, JSXExpressionContainer } from '@babel/types';

import { NodeTypeNotSupportedError, NotSupportedError } from '../errors';
import { getDataForScope } from './get-data-for-scope';
import { resolveOperand } from './resolve-operand';


export function evaluateExpression(node: NodePath<JSXExpressionContainer>): any {
	const expr = node.get('expression') as NodePath<Expression>;

	if (expr.isMemberExpression()) {
		const data = getDataForScope(expr);
		const property = (expr.node.property as Identifier).name;

		return data[property];
	} else if (expr.isBinaryExpression()) {
		const left = resolveOperand(expr.get('left'));
		const right = resolveOperand(expr.get('right'));
		const operator = expr.node.operator;

		switch (operator) {
			case '==': {
				// tslint:disable-next-line:triple-equals
				return (left == right);
			}
			case '===': {
				return (left === right);
			}
			default: {
				throw new NotSupportedError(`Operator '${operator}' is not supported currently.`);
			}
		}
	} else {
		throw new NodeTypeNotSupportedError(expr.node, evaluateExpression.name);
	}
}
