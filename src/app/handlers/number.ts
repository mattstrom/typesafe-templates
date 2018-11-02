import { NodePath } from '@babel/traverse';
import { JSXElement, numericLiteral } from '@babel/types';

import { getDataValueForAttribute } from '../helpers';
import { Handler } from './handlers';


/**
 *  Noop function to provides type definition for JSX element.
 */
export function $number(props: { value: number; }): number {
	return 0;
}

export const handleNumberElement: Handler = (path: NodePath<JSXElement>, state: any) => {
	const value = getDataValueForAttribute(path, 'value');
	path.replaceWith(numericLiteral(value));
};
