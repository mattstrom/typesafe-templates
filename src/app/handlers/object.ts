import { NodePath } from '@babel/traverse';
import { JSXElement, objectExpression } from '@babel/types';

import { getDataValueForAttribute } from '../helpers';
import { Handler } from './handlers';


/**
 *  Noop function to provides type definition for JSX element.
 */
export function $object(props: { name: object; }): object {
	return {};
}

export const handleObjectElement: Handler = (path: NodePath<JSXElement>, state: any) => {
	const value = getDataValueForAttribute(path, 'name');
	path.replaceWith(objectExpression(value));
};
