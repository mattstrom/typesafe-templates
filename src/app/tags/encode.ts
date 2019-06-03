import { NodePath } from '@babel/traverse';
import { JSXElement } from '@babel/types';

import { getJSXElementName } from '../helpers';


export const enum Encoding {
	Base64 = 'base64',
	Uri = 'uri',
	UriComponent = 'uri-component'
}

/**
 *  Noop function to provide type definition for JSX element.
 */
export function $encode<T extends JSXElement>(props: { type: Encoding; children?: T }): T | null | undefined {
	return null;
}

export function isEncodeElement(node: NodePath) {
	const name = getJSXElementName(node);
	return (name === '$encode');
}
