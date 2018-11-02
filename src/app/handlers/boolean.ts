import { NodePath } from '@babel/traverse';
import { booleanLiteral, JSXElement } from '@babel/types';

import { getDataValueForAttribute } from '../helpers';
import { Handler } from './handlers';


/**
 *  Noop function to provides type definition for JSX element.
 */
export function $boolean(props: { value: boolean; }): boolean {
	return true;
}

export const handleBooleanElement: Handler = (path: NodePath<JSXElement>, state: any) => {
	const value = getDataValueForAttribute(path, 'name');
	path.replaceWith(booleanLiteral(value));
};
