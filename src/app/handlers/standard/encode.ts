import { NodePath } from '@babel/traverse';
import { isJSXElement, JSXElement } from '@babel/types';
import astify from 'babel-literal-to-ast';

import { InvalidEncodingType } from '../../errors';
import { encode, getDataValueForAttribute } from '../../helpers';
import { isExprElement } from '../../tags';
import { Handler } from '..';


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

	try {
		encoded = encode(type, `${value}`);
	} catch (err: any) {
		throw new InvalidEncodingType(type, path, err);
	}

	const ast = astify(encoded);
	path.replaceWith(ast);
};
