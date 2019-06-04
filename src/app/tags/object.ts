import { NodePath } from '@babel/traverse';
import { getJSXElementName } from '../helpers';


/**
 *  Noop function to provide type definition for JSX element.
 */
export function $object(props: { value: object; }): object {
	return {};
}

export function isObjectElement(node: NodePath) {
	const name = getJSXElementName(node);
	return (name === '$object');
}
