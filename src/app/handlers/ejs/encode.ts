import { NodePath } from '@babel/traverse';
import { identifier, isJSXElement, JSXElement } from '@babel/types';

import { getDataValueForAttribute, getRefValueForAttribute } from '../../helpers';
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
	const ref = getRefValueForAttribute(child, isExpr ? 'code' : 'value');

	const tag = `<%- encode('${type}', ${ref}) %>`;

	path.replaceWith(identifier(isExpr ? tag : `'${tag}'`));
};
