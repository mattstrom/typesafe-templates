import { NodePath } from '@babel/traverse';
import { getJSXElementName } from '../helpers';


/**
 *  Noop function to provide type definition for JSX element.
 */
export function $any(props: { value: any; }): any {
	return null;
}

export function isAnyElement(node: NodePath) {
	const name = getJSXElementName(node);
	return (name === '$any');
}
