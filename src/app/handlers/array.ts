import { NodePath } from '@babel/traverse';
import { arrayExpression, JSXElement } from '@babel/types';

import { getDataValueForAttribute } from '../helpers';
import { Handler } from './handlers';


/**
 *  Noop function to provides type definition for JSX element.
 */
export function $array(props: { name: Array<any>; }): Array<any> {
	return [];
}

export const handleArrayElement: Handler = (path: NodePath<JSXElement>, state: any) => {
	const value = getDataValueForAttribute(path, 'name');
	path.replaceWith(arrayExpression(value));
};
