import { NodePath } from '@babel/traverse';
import { identifier, JSXElement } from '@babel/types';
import { getRefValueForAttribute } from '../../helpers';

export function handleExprElement(path: NodePath<JSXElement>, state: any) {
	const ref = getRefValueForAttribute(path, 'code');

	path.replaceWith(
		identifier(`<%- ${ref} %>`)
	);
}
