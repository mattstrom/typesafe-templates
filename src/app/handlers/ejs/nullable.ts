import { NodePath } from '@babel/traverse';
import { identifier, isJSXElement, JSXElement } from '@babel/types';

import { getRefValueForAttribute } from '../../helpers';
import { Handler } from '..';


export const handleNullableElement: Handler = (path: NodePath<JSXElement>, state: any) => {
	const { children } = path.node;

	if (children.length !== 1) {
		throw new Error('$nullable must contain one and only one child');
	}

	const child = path.get('children.0') as NodePath<JSXElement>;

	if (!isJSXElement(child)) {
		throw new Error('Child of $nullable must be a JSX element');
	}

	const ref = getRefValueForAttribute(child, 'value');

	path.insertBefore(identifier(`(${ref} === undefined || ${ref} === null) ? <%= ${ref} %> : `));
	path.insertBefore(child.node);

	path.remove();
};
