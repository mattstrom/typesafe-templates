import { NodePath } from '@babel/traverse';
import {
	ArrowFunctionExpression, cloneDeep, FunctionExpression, Identifier,
	isArrowFunctionExpression, isBlockStatement, isFunctionExpression,
	isIdentifier, isJSXExpressionContainer, JSXElement, JSXExpressionContainer,
	Statement
} from '@babel/types';

import { InvalidChildNode } from '../errors';


export interface ControlFlowTagContext {
	args: string[];
	blocks: Statement[];
}

/**
 * Resolves a control flow tag into a ControlFlowContext object.
 *
 * @param path
 * @param state
 */
export function resolveControlFlowTag<T extends JSXElement>(path: NodePath<T>, state: any = {}): ControlFlowTagContext {
	const children = path.node.children;

	const clones: JSXExpressionContainer[] = children
		.filter(child => {
			return isJSXExpressionContainer(child)
				&& (isArrowFunctionExpression(child.expression)
					|| isFunctionExpression(child.expression));
		})
		.map(child => cloneDeep(child) as JSXExpressionContainer);

	if (!clones || clones.length !== 1) {
		throw new InvalidChildNode(path);
	}

	const funcs = clones
		.map(clone => clone.expression as (ArrowFunctionExpression | FunctionExpression));

	const args = funcs.map(fn => fn.params)
		.map(fn => fn
			.filter(isIdentifier)
			.map((fnArgs: Identifier) =>
				fnArgs.name
			)
		)
		.slice(0, 1)
		.reduce((acc, item) => item, []);

	const blocks = funcs
		.filter(func => isBlockStatement(func.body))
		.reduce((acc, func) => {
			return (isBlockStatement(func.body))
				? acc.concat(func.body.body)
				: acc;
		}, [] as Statement[]);

	return {
		args,
		blocks
	};
}
