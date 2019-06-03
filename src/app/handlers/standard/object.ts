import { NodePath } from '@babel/traverse';
import { JSXElement } from '@babel/types';
import astify from 'babel-literal-to-ast';

import { getDataValueForAttribute } from '../../helpers';


export function handleObjectElement(path: NodePath<JSXElement>, state: any) {
	const value = getDataValueForAttribute(path, 'value');
	const ast = astify(value);

	path.replaceWith(ast);
}
