import { NodePath } from '@babel/traverse';
import { booleanLiteral, JSXElement } from '@babel/types';

import { getDataValueForAttribute } from '../helpers';
import { Handler } from './tags';


/**
 *  Noop function to provides type definition for JSX element.
 */
export function $boolean(props: { value: boolean; }): boolean {
	return true;
}

export const handleBooleanElement: Handler = (path: NodePath<JSXElement>, state: any) => {
	const value = getDataValueForAttribute(path, 'value');
	path.replaceWith(booleanLiteral(value));
};
