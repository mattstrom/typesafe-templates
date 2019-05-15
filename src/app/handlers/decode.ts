import { NodePath } from '@babel/traverse';
import { isJSXElement, JSXElement } from '@babel/types';
import atob from 'atob';
import astify from 'babel-literal-to-ast';

import { Encoding } from './encode';
import { getDataValueForAttribute } from '../helpers';
import { Handler } from './handlers';


/**
 *  Noop function to provide type definition for JSX element.
 */
export function $decode<T extends JSXElement>(props: { type: Encoding; children?: T }): T | null | undefined {
	return null;
}

export const handleDecodeElement: Handler = (path: NodePath<JSXElement>, state: any) => {
	const { children } = path.node;

	if (children.length !== 1) {
		throw new Error('$decode must contain one and only one child');
	}

	const child = path.get('children.0') as NodePath<JSXElement>;

	if (!isJSXElement(child)) {
		throw new Error('Child of $decode must be a JSX element');
	}

	const type = getDataValueForAttribute(path, 'type');
	const value = getDataValueForAttribute(child, 'value');

	let decoded;

	switch (type) {
		case Encoding.Base64: {
			decoded = atob(value);
			break;
		}
		case Encoding.Uri: {
			decoded = decodeURI(value);
			break;
		}
		case Encoding.UriComponent: {
			decoded = decodeURIComponent(value);
			break;
		}
		default: {
			path.replaceWith(child);
			return;
		}
	}

	const ast = astify(decoded);
	path.replaceWith(ast);
};
