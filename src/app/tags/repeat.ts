import { NodePath } from '@babel/traverse';
import { getJSXElementName } from '../helpers';


/**
 *  Noop function that provides type definition for JSX element.
 */
export function $repeat(props: { items: string | any[]; }): void {}

export function isRepeatElement(node: NodePath) {
	const name = getJSXElementName(node);
	return (name === '$repeat');
}
