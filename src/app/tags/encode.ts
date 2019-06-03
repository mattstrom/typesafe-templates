import { NodePath } from '@babel/traverse';
import { isJSXElement, JSXElement } from '@babel/types';
import astify from 'babel-literal-to-ast';
import btoa from 'btoa';

import { getDataValueForAttribute } from '../helpers';
import { isExprElement } from './expr';
import { Handler } from './tags';


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

export const handleEncodeElement: Handler = (path: NodePath<JSXElement>, state: any) => {
	const { children } = path.node;

	if (children.length !== 1) {
		throw new Error('$encode must contain one and only one child');
	}

	const child = path.get('children.0') as NodePath<JSXElement>;

	if (!isJSXElement(child)) {
		throw new Error('Child of $encode must be a JSX element');
	}

	const isExpr = isExprElement(child);

	const type = getDataValueForAttribute(path, 'type');
	const value = getDataValueForAttribute(child, isExpr ? 'code' : 'value');

	let encoded;

	switch (type) {
		case Encoding.Base64: {
			encoded = btoa(value);
			break;
		}
		case Encoding.Uri: {
			encoded = encodeURI(value);
			break;
		}
		case Encoding.UriComponent: {
			encoded = encodeURIComponent(value);
			break;
		}
		default: {
			path.replaceWith(child);
			return;
		}
	}

	const ast = astify(encoded);
	path.replaceWith(ast);
};
