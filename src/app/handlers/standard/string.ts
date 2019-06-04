import { NodePath } from '@babel/traverse';
import { JSXElement, stringLiteral } from '@babel/types';

import { getDataValueForAttribute } from '../../helpers';


export function handleStringElement(path: NodePath<JSXElement>, state: any) {
	const value = getDataValueForAttribute(path, 'value');
	path.replaceWith(stringLiteral(value));
}
