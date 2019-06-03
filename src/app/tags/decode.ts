import { NodePath } from '@babel/traverse';
import { JSXElement } from '@babel/types';

import { getJSXElementName } from '../helpers';
import { Encoding } from './encode';


/**
 *  Noop function to provide type definition for JSX element.
 */
export function $decode<T extends JSXElement>(props: { type: Encoding; children?: T }): T | null | undefined {
	return null;
}

export function isDecodeElement(node: NodePath) {
	const name = getJSXElementName(node);
	return (name === '$decode');
}
