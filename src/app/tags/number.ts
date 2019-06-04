import { NodePath } from '@babel/traverse';
import { getJSXElementName } from '../helpers';


/**
 *  Noop function to provides type definition for JSX element.
 */
export function $number(props: { value: number; }): number {
	return 0;
}

export function isNumberElement(node: NodePath) {
	const name = getJSXElementName(node);
	return (name === '$number');
}
