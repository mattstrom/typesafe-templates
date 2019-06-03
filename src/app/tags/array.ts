import { NodePath } from '@babel/traverse';
import { getJSXElementName } from '../helpers';


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
