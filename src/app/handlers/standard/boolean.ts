import { NodePath } from '@babel/traverse';
import { booleanLiteral, JSXElement } from '@babel/types';

import { getDataValueForAttribute } from '../../helpers';
import { Handler } from '..';


export const handleBooleanElement: Handler = (path: NodePath<JSXElement>, state: any) => {
	const value = getDataValueForAttribute(path, 'value');
	path.replaceWith(booleanLiteral(value));
};
