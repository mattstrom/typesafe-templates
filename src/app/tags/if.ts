import { NodePath } from '@babel/traverse';
import { getJSXElementName } from '../helpers';

/**
 *  Noop function to provides type definition for JSX element.
 */
export function $if(props: { test: any }): boolean {
	return true;
}

export function isIfElement(node: NodePath) {
	const name = getJSXElementName(node);
	return (name === '$if');
}
