import { NodePath } from '@babel/traverse';
import { JSXElement, numericLiteral } from '@babel/types';

import { getDataValueForAttribute } from '../../helpers';
import { Handler } from '..';


export const handleNumberElement: Handler = (path: NodePath<JSXElement>, state: any) => {
	const value = getDataValueForAttribute(path, 'value');
	path.replaceWith(numericLiteral(value));
};
