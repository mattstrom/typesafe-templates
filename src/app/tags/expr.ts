import { NodePath } from '@babel/traverse';
import { getJSXElementName } from '../helpers';


/**
 *  Noop function to provides type definition for JSX element.
 */
export function $expr(props: { code: any }): any {
	return {};
}

export function isExprElement(node: NodePath) {
	const name = getJSXElementName(node);
	return (name === '$expr');
}
