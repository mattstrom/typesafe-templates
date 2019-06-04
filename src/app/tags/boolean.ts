import { NodePath } from '@babel/traverse';
import { getJSXElementName } from '../helpers';


/**
 *  Noop function to provides type definition for JSX element.
 */
export function $boolean(props: { value: boolean; }): boolean {
	return true;
}

export function isBooleanElement(node: NodePath) {
	const name = getJSXElementName(node);
	return (name === '$boolean');
}
