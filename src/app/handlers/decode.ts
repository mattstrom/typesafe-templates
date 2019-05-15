import { parse } from '@babel/parser';
import { NodePath } from '@babel/traverse';
import { isJSXElement, JSXElement } from '@babel/types';
import atob from 'atob';
import astify from 'babel-literal-to-ast';

import { getDataValueForAttribute } from '../helpers';
import { Encoding } from './encode';
import { isExprElement } from './expr';
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

	const isExpr = isExprElement(child);

	const type = getDataValueForAttribute(path, 'type');
	const value = getDataValueForAttribute(child, isExpr ? 'code' : 'value');

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

	if (isExpr) {
		const ast = parse(decoded);
		path.replaceWith(ast.program.body[0]);
	} else {
		const ast = astify(decoded);
		path.replaceWith(ast);
	}
};
