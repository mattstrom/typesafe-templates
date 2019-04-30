import { NodePath } from '@babel/traverse';
import { identifier, isJSXElement, JSXElement, nullLiteral } from '@babel/types';

import { getDataValueForAttribute } from '../helpers';
import { Handler } from './handlers';


/**
 *  Noop function to provide type definition for JSX element.
 */
export function $nullable<T>(props: { children: T }): T | null | undefined {
	return null;
}

export const handleNullableElement: Handler = (path: NodePath<JSXElement>, state: any) => {
	const { children } = path.node;

	if (children.length !== 1) {
		throw new Error('$nullable must contain one and only one child');
	}

	const child = path.get('children.0') as NodePath<JSXElement>;

	if (!isJSXElement(child)) {
		throw new Error('Child of $nullable must be a JSX element');
	}

	const value = getDataValueForAttribute(child, 'value');

	if (value === null) {
		path.replaceWith(nullLiteral());
	} else if (value === undefined) {
		path.replaceWith(identifier('undefined'));
	} else {
		path.replaceWith(child);
	}
};
