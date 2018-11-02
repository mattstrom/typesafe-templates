import { parse } from '@babel/parser';
import { NodePath } from '@babel/traverse';
import { JSXElement } from '@babel/types';

import { getDataValueForAttribute, getJSXElementName } from '../helpers';
import { InvalidExpressionError } from '../errors';


/**
 *  Noop function to provides type definition for JSX element.
 */
export function $expr(props: { code: any }): any {
	return {};
}

export function isExprElement(node: NodePath) {
	const name = getJSXElementName(node);
	return (name === '$expr');
}

export function handleExprElement(node: NodePath<JSXElement>, state: any) {
	const value = getDataValueForAttribute(node, 'code');

	if (typeof value !== 'string') {
		throw new InvalidExpressionError(value.toString());
	}

	const result = parse(value);

	if (!result) {
		throw new InvalidExpressionError(value.toString());
	}

	node.replaceWith(result.program.body[0]);
}
