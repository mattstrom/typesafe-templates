import { NodePath } from '@babel/traverse';
import { JSXElement } from '@babel/types';
import astify from 'babel-literal-to-ast';

import { getDataValueForAttribute, getJSXElementName } from '../helpers';


/**
 *  Noop function to provide type definition for JSX element.
 */
export function $array(props: { value: Array<any>; }): Array<any> {
	return [];
}

export function isArrayElement(node: NodePath) {
	const name = getJSXElementName(node);
	return (name === '$array');
}

export function handleArrayElement(path: NodePath<JSXElement>, state: any) {
	const value = getDataValueForAttribute(path, 'value');
	const ast = astify(value);

	path.replaceWith(ast);
}
