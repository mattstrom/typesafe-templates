import { NodePath } from '@babel/traverse';
import { getJSXElementName } from '../helpers';


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
