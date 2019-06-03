import { parse } from '@babel/parser';
import { NodePath } from '@babel/traverse';
import { isJSXElement, JSXElement } from '@babel/types';
import astify from 'babel-literal-to-ast';

import { InvalidEncodingType } from '../../errors';
import { decode, getDataValueForAttribute } from '../../helpers';
import { isExprElement } from '../../tags';
import { Handler } from '..';


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

	try {
		decoded = decode(type, value);
	} catch (err) {
		throw new InvalidEncodingType(type, path, err);
	}

	if (isExpr) {
		const ast = parse(decoded);
		path.replaceWith(ast.program.body[0]);
	} else {
		const ast = astify(decoded);
		path.replaceWith(ast);
	}
};
