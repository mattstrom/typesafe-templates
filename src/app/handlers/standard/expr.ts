import { parse } from '@babel/parser';
import { NodePath } from '@babel/traverse';
import { JSXElement } from '@babel/types';

import { InvalidExpression } from '../../errors';
import { getDataValueForAttribute } from '../../helpers';


export function handleExprElement(node: NodePath<JSXElement>, state: any) {
	const value = getDataValueForAttribute(node, 'code');

	if (typeof value !== 'string') {
		throw new InvalidExpression(value.toString(), node);
	}

	try {
		const result = parse(value);
		node.replaceWith(result.program.body[0]);
	} catch (e) {
		throw new InvalidExpression(value.toString(), node, e);
	}
}
