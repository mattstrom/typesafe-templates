import { NodePath } from '@babel/traverse';
import { JSXElement, stringLiteral } from '@babel/types';

import { getDataValueForAttribute, getJSXElementName } from '../helpers';


/**
 *  Noop function to provides type definition for JSX element.
 */
export function $string(props: { value: string; }): string {
	return '';
}

export function isStringElement(node: NodePath) {
	const name = getJSXElementName(node);
	return (name === '$string');
}

export function handleStringElement(path: NodePath<JSXElement>, state: any) {
	const value = getDataValueForAttribute(path, 'value');
	path.replaceWith(stringLiteral(value));
}
