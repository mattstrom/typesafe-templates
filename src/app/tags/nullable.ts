import { NodePath } from '@babel/traverse';
import { getJSXElementName } from '../helpers';


/**
 *  Noop function to provide type definition for JSX element.
 */
export function $nullable<T>(props: { children?: T }): T | null | undefined {
	return null;
}

export function isNullableElement(node: NodePath) {
	const name = getJSXElementName(node);
	return (name === '$nullable');
}
